import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";
import { checkDuplicateId2 } from "../BILLING/NewBill.js"; // for historyid
import { getuseremail, getuseraccountnumber } from "../LOGIN/userallgetter.js";

// Generate unique transaction ID
const getIdNum = () => {
  let Id = "TR-";
  for (let i = 0; i < 4; i++) {
    Id += Math.floor(Math.random() * 10).toString(); // Generate a digit from 0-9
  }
  return Id;
};

const checkDuplicateId = async () => {
  let Id = getIdNum();
  const checkAcc = await pool.query(
    "SELECT * FROM INTER_BANK_TRANSACTIONS WHERE trans_id = $1",
    [Id]
  );

  if (checkAcc.rows.length > 0) {
    return await checkDuplicateId(); // Recurse to generate a new ID
  } else {
    return Id;
  }
};

// Main function for interbank transaction
export const interbanktransaction = async (req, res) => {
  const { accnum, check, Amount } = req.body;
  const trans_id = await checkDuplicateId(); // Ensure this is awaited
  const amount = Number(Amount);

  // Variables for transaction
  let recv_id, recv_email, recv_accnum;
  let snd_id = getGId(); // Sender ID from session or JWT
  let snd_email, snd_accnum;

  try {
    // Get receiver details by account number
    const receiverData = await pool.query(
      "SELECT user_id, email FROM users WHERE account_number = $1",
      [accnum]
    );

    if (receiverData.rows.length === 0) {
      return res.status(500).json({ message: "Receiver account does not exist" });
    }

    const receiver = receiverData.rows[0];
    recv_id = receiver.user_id;
    recv_accnum = accnum;
    recv_email = receiver.email;

    // Get sender balance
    const senderBalanceData = await pool.query(
      "SELECT balance, minbal, maxbal FROM balance WHERE user_id = $1",
      [snd_id]
    );

    if (senderBalanceData.rows.length === 0) {
      return res.status(500).json({ message: "Sender account does not exist" });
    }

    const senderBalance = senderBalanceData.rows[0];
    let bal = Number(senderBalance.balance);
    let minbal = Number(senderBalance.minbal);
    let maxbal = Number(senderBalance.maxbal);

    // Get sender's email and account number
    const senderDetails = await pool.query(
      "SELECT account_number, email FROM users WHERE user_id = $1",
      [snd_id]
    );

    if (senderDetails.rows.length === 0) {
      return res.status(500).json({ message: "Sender account retrieval failed" });
    }

    snd_accnum = senderDetails.rows[0].account_number;
    snd_email = senderDetails.rows[0].email;

    // Check if sender has sufficient balance
    if (bal < amount) {
      return res.status(500).json({ message: "Insufficient balance" });
    }

    // Deduct amount from sender's account
    bal -= amount;
    minbal = Math.min(minbal, bal);

    await pool.query(
      "UPDATE balance SET balance = $1, minbal = $2, maxbal = $3 WHERE user_id = $4",
      [bal, minbal, maxbal, snd_id]
    );

    // Add amount to receiver's account
    const receiverBalanceData = await pool.query(
      "SELECT balance, minbal, maxbal FROM balance WHERE user_id = $1",
      [recv_id]
    );

    if (receiverBalanceData.rows.length === 0) {
      return res.status(500).json({ message: "Receiver account does not exist" });
    }

    let bal2 = Number(receiverBalanceData.rows[0].balance);
    let minbal2 = Number(receiverBalanceData.rows[0].minbal);
    let maxbal2 = Number(receiverBalanceData.rows[0].maxbal);

    bal2 += amount;
    maxbal2 = Math.max(maxbal2, bal2);

    await pool.query(
      "UPDATE balance SET balance = $1, minbal = $2, maxbal = $3 WHERE user_id = $4",
      [bal2, minbal2, maxbal2, recv_id]
    );

    // Insert transaction record
    await pool.query(
      `INSERT INTO INTER_BANK_TRANSACTIONS 
        (TRANS_ID, SENDER_USER_ID, SENDER_EMAIL, SENDER_ACCOUNT_NUMBER, 
        RECEIVER_USER_ID, RECEIVER_EMAIL, RECEIVER_ACCOUNT_NUMBER, TERMSCHECK, AMOUNT) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [trans_id, snd_id, snd_email, snd_accnum, recv_id, recv_email, recv_accnum, check, amount]
    );

    // Insert into history
    const history_id = await checkDuplicateId2();
    await pool.query(
      "INSERT INTO history (history_id, user_id, bill_id, transaction_id) VALUES ($1, $2, $3, $4)",
      [history_id, snd_id, null, trans_id]
    );

    return res.status(200).json({ message: "Transaction successful" });
  } catch (err) {
    console.error("Error in transaction:", err);
    return res.status(500).json({ message: "Transaction failed: " + err.message });
  }
};

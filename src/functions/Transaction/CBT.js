import pool from "../../config/db.js";
import { checkDuplicateId2 } from "../History/getHistoryId.js";
import { getGId } from "../LOGIN/getUserId.js";
import { checkDuplicateId } from "./getTransactionId.js";
// Cross-Banking Transaction
const crossbankingtransaction = async (req, res) => {
  const { accnum, amount } = req.body;
  const user_id=getGId();

  if (!accnum || !amount) {
    return res.status(400).json({ message: "Account number and amount are required" });
  }

  try {
    // Check if receiver exists in CBT table
    const receiverData = await pool.query(
      "SELECT accnum, AMOUNT FROM CBT WHERE accnum = $1",
      [accnum]
    );

    if (receiverData.rows.length === 0) {
      return res.status(404).json({ message: "Receiver account does not exist" });
    }

    const senderBalanceData = await pool.query(
        "SELECT balance, minbal, maxbal FROM balance WHERE user_id = $1",
        [user_id]
      );
  
      if (senderBalanceData.rows.length === 0) {
        return res.status(500).json({ message: "Sender account does not exist" });
      }
  
      const senderBalance = senderBalanceData.rows[0];
      let bal = Number(senderBalance.balance);
      let minbal = Number(senderBalance.minbal);
      let maxbal = Number(senderBalance.maxbal);


      if (bal < amount) {
        return res.status(500).json({ message: "Insufficient balance" });
      }
  
      // Deduct amount from sender's account
      bal -= amount;
      minbal = Math.min(minbal, bal);
  
      await pool.query(
        "UPDATE balance SET balance = $1, minbal = $2, maxbal = $3 WHERE user_id = $4",
        [bal, minbal, maxbal, user_id]
      );
  
    // Update receiver's amount
    const receiverAmount = Number(receiverData.rows[0].amount);
    const updatedAmount = receiverAmount + Number(amount);

    await pool.query(
      "UPDATE CBT SET AMOUNT = $1 WHERE accnum = $2",
      [updatedAmount, accnum]
    );
    const trans_id=await checkDuplicateId();
    const history_id = await checkDuplicateId2();
    await pool.query(
      "INSERT INTO history (history_id, user_id, bill_id, transaction_id) VALUES ($1, $2, $3, $4)",
      [history_id, user_id, null, trans_id]
    );

    return res.status(200).json({ message: "Cross-bank transaction successful" });
  } catch (err) {
    console.error("Error in cross-bank transaction:", err);
    return res.status(500).json({ message: "Transaction failed: " + err.message });
  }
};

export default crossbankingtransaction;

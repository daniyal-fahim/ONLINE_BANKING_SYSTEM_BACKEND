import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";

export const interbanktransaction = async (req, res) => {
  const { accnum, Amount } = req.body;
  const amount = Number(Amount);
  var recv_id = "";
  var user_id = getGId();
  try {
    const data = await pool.query(
      "select user_id from users where account_number=$1",
      [accnum]
    );

    if (data.rows.length > 0) {
      const recv = data.rows[0];
      recv_id = recv.user_id;

      const temp = await pool.query("select * from balance where user_id=$1", [
        user_id,
      ]);
      if (temp.rows.length > 0) {
                  const user = temp.rows[0];
        var bal = Number(user.balance); 
            var minbal = Number(user.minbal);
            var maxbal = Number(user.maxbal);
        console.log(amount + bal);
        if (bal > Number(amount)) {
          const temp1 = await pool.query(
            "select * from balance where user_id=$1",
            [recv_id]
          );
          if (temp1.rows.length > 0) {
            //IF RECIEVER ACCOUNT EXIST THEN SUBTRACT MONEY FROM THE USER ACCOUNT
            bal = bal - amount;
            if (bal < minbal) {
              minbal = bal;
            }
            await pool.query(
              "UPDATE balance SET balance = $1, minbal = $2, maxbal = $3 WHERE user_id = $4",
              [bal, minbal, maxbal, user_id]
            );
            //receiver account creating issues
            const user11 = temp1.rows[0];
            var bal2 = Number(user11.balance); // Ensure bal2 is a number
            var minbal2 = Number(user11.minbal);
            var maxbal2 = Number(user11.maxbal);
            console.log(`bal 2 ${bal2} amount ${amount}`); // Use backticks for template literals
            bal2 = bal2 + Number(amount); // Ensure amount is a number
            console.log("new balance of the receiver is: " + bal2);
            if (bal2 > maxbal2) {
              maxbal2 = bal2;
            }
            await pool.query(
              "UPDATE balance SET balance = $1, minbal = $2, maxbal = $3 WHERE user_id = $4",
              [bal2, minbal2, maxbal2, recv_id]
            );
            console.log(
              "TRANSACTION SUCCESSFUL reciever bal" + bal + "" + bal2
            );
            console.log(user_id);
            console.log(recv_id);
            res.status(200).json({ message: "TTRANSACTION SUCCESSFUL" });
          } else {
            console.log("RECEIVER IS ENELIGIBALE FOR TRANSACTION");
            res
              .status(500)
              .json({ message: "RECEIVER IS ENELIGIBALE FOR TRANSACTION" });
          }
        } else {
          console.log("UNSUFFICIENT BALANCE");
          res.status(500).json({ message: "UNSUFFICIENT BALANCE" });
        }
      } else {
        console.log("SENDER ACCOUNT DOES NOT EXIST");
        res.status(500).json({ message: "SENDER ACCOUNT DOES NOT EXIST" });
      }
    } else {
      console.log("RECEIVER ACCOUNT DOES NOT EXIST");
      res.status(500).json({ message: "RECEIVER ACCOUNT DOES NOT EXIST" });
    }
  } catch (err) {
    console.log("RECEIVER ACCOUNT DOES NOT EXIST" + err);
    var msg = "RECEIVER ACCOUNT DOES NOT EXIST" + err;
    res.status(500).json({ message: msg });
  }
};

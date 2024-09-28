import { pool, } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";

const data = {};
export const billing = async (req, res) => {
  const { selectedBill, accnum, amount,company, username, check, month, email, address } =
    req.body;

  let user_id=getGId();
  const selectedCompany = company; // Set selectedCompany
  var newbal;
  

  try {
    // Check if the user has enough balance
    const temp = await pool.query(
      "SELECT balance,minbal,maxbal FROM balance WHERE user_id = $1",
      [user_id]
    );
  var minbal;
  var maxbal;
    if (temp.rows.length > 0) {
      const user = temp.rows[0];
      console.log(user.balance);
      newbal = user.balance;
      minbal= user.minbal;
      maxbal=user.maxbal;
      
      
      if (Number(user.balance) > Number(amount)) 
        {
        // Insert into the bills table
       const result= await pool.query(
          'INSERT INTO bills ( "termscheck",user_id, amount,address,account_number,select_type,bill_month,selected_company,username ,email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING bill_id',
          [
            check,
            user_id,
            amount,
            address,
            accnum,
            selectedBill,
            month,
            selectedCompany,
            username,
            email
          ]
        );
        //geting the bill id
        const billId = result.rows[0].bill_id;

        let balance=newbal;
        balance = balance - amount;
         if(balance < minbal){
              minbal=balance;
         }
         else if(balance>maxbal){
            maxbal=balance;
         }

         await pool.query(
          "UPDATE balance SET balance = $1, minbal = $2, maxbal = $3 WHERE user_id = $4",
          [balance, minbal, maxbal, user_id]
        );

        await pool.query(
          'insert into history (user_id,bill_id,transaction_id) VALUES ($1,$2,$3) ',
          [user_id,billId,null]
        );
        const temp = await pool.query(
          "SELECT balance FROM balance WHERE user_id = $1",
          [user_id]
        );

        if (temp.rows.length > 0) {
          const user = temp.rows[0];
          console.log(user.balance);
          newbal = user.balance;
        }
        res.status(200).json({
          message: "Bill added and balance updated successfully",
          newbal,
        });
      } else {
        res.status(400).json({ message: "Insufficient balance" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
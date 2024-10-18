import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";
import { checkDuplicateId2  } from "../History/getHistoryId.js";

//generate unique bill_id
const getIdNum = () => {
  let Id = '';  // Use a meaningful variable name
  Id+='B-'
  for (let i = 0; i < 4; i++) {
    Id +=Math.floor(Math.random() * 10).toString();  // Generate a digit from 0-9
  }
  return Id;  // Return the generated account number
}

const checkDuplicateId = async () => {
  let Id = getIdNum();  // Get a new account number
  const checkAcc = await pool.query(
    "SELECT * FROM bills WHERE bill_id = $1",
    [Id]
  );

  if (checkAcc.rows.length > 0 ) {
    console.log(Id);
    return await checkDuplicateId();  
  } else {
    return Id;  
  }
}

// //generate unique history_id
// const getIdNum2 = () => {
//   let Id = '';  // Use a meaningful variable name
//   Id+='HS-'
//   for (let i = 0; i < 4; i++) {
//     Id +=Math.floor(Math.random() * 10).toString();  // Generate a digit from 0-9
//   }
//   return Id;  // Return the generated account number
// }

// export const checkDuplicateId2 = async () => {
//   let Id = getIdNum2();  // Get a new account number
//   const checkAcc = await pool.query(
//     "SELECT * FROM history WHERE history_id = $1",
//     [Id]
//   );

//   if (checkAcc.rows.length > 0 ) {
//     console.log(Id);
//     return await checkDuplicateId2();  
//   } else {
//     return Id;  
//   }
// }




const data = {};
export const billing = async (req, res) => {
  var { selectedBill, accnum, amount,company, username, check, month, email, address } =
    req.body;
    amount=Number(amount);
  let user_id=getGId();
  const selectedCompany = company; // Set selectedCompany
  var newbal;
  const bill_id=await checkDuplicateId();

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
          'INSERT INTO bills ( bill_id,"termscheck",user_id, amount,address,account_number,select_type,bill_month,selected_company,username ,email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING bill_id',
          [
            bill_id,
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
        //getting and creating history id
          const history_id=await checkDuplicateId2();
        await pool.query(
          'insert into history (history_id,user_id,bill_id,transaction_id) VALUES ($1,$2,$3,$4) ',
          [history_id,user_id,billId,null]
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
          ok:true
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
import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";
///UNDER CONSTRUCTION

// export const getbillhistory = async (req, res) => {
//     const user_id = getGId(req); // Adjusted
//     try {
//         const data = await pool.query('select * from history where user_id = $1', [user_id]); // Added brackets around user_id
//         var historybill = []; // Corrected initialization

//         if (data.rows.length > 0) {
//             var user1 = data.rows;

//             user1.forEach(async (user1) => { // Corrected the iteration
//                 if (user1.bill_id != null) {
//                     console.log(user1.bill_id);
//                     const temp = user1.bill_id;
//                     const data1 = await pool.query('select * from bills where user_id = $1', [temp]); // Added brackets
//                     if (data1.rows.length > 0) {
//                         history.push(...data1.rows[0]); // Corrected concatenation
//                     }
//                 }
//                 if (user1.trans_id != null) {
//                     console.log(user1.trans_id);
//                     const temp1 = user1.trans_id;
//                     const data2 = await pool.query('select * from INTER_BANK_TRANSACTIONS where trans_id = $1', [temp1]); // Added brackets
//                     if (data2.rows.length > 0) {
//                         history.push(...data2.rows[0]); // Corrected concatenation
//                     }
//                 }
//             });

//             res.json({ data: history });
//         } else {
//             res.status(500).json({ message: "no user history found" });
//         }
//     } catch (err) {
//         console.error(err); // Added error logging
//         res.status(500).json({ message: "Internal server error" }); // Added error response
//     }
// }
export const getbillhistory = async (req, res) => {
    // const { email} = req.body;
    var GId=getGId();
    try {
      // Query to check if the user exists and get the hashed password
  
          const billsResult = await pool.query(
            "SELECT * FROM bills WHERE user_id = $1",
            [GId]
          );
  
          if (billsResult.rows.length > 0) {
            // Send the bills in the response
            res.json({ bills: billsResult.rows, ok: true });
          } else {
            // No bills found for the user
            res.status(404).json({ bills:[], ok: false });
          }
      
      
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const gettranshistory = async (req, res) => {
    // const { email} = req.body;
    var GId=getGId();
    try {
      // Query to check if the user exists and get the hashed password
  
          const transResult = await pool.query(
            "SELECT * FROM INTER_BANK_TRANSACTIONS WHERE sender_user_id = $1",
             [GId]
          );
  
          if (transResult.rows.length > 0) {
            // Send the bills in the response
            res.json({ bills: transResult.rows, ok: true });
          } else {
            // No bills found for the user
            res.status(404).json({ bills:[], ok: false });
          }
      
      
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
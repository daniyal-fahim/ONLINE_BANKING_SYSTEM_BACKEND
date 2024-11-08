import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";
///UNDER CONSTRUCTION

export const getfullbillhistory = async (req, res) => {
    // const { email} = req.body;
    var GId=getGId();
    try {
      // Query to check if the user exists and get the hashed password
  
          const billsResult = await pool.query(
            "SELECT * FROM bills");
  
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

  export const getfulltranshistory = async (req, res) => {
    // const { email} = req.body;
    var GId=getGId();
    try {
      // Query to check if the user exists and get the hashed password
  
          const transResult = await pool.query(
            "SELECT * FROM INTER_BANK_TRANSACTIONS",
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
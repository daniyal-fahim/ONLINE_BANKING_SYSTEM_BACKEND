import { pool, } from "../../../index.js";
import { getGemail } from "../LOGIN/getUserEmail.js";

export const showBills = async (req, res) => {
    // const { email} = req.body;
    var email=getGemail();
    try {
      // Query to check if the user exists and get the hashed password
      const userResult = await pool.query(
        "SELECT password FROM users WHERE email = $1",
        [email]
      );
  
      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
  
          const billsResult = await pool.query(
            "SELECT * FROM bills WHERE email = $1",
            [email]
          );
  
          if (billsResult.rows.length > 0) {
            // Send the bills in the response
            res.json({ bills: billsResult.rows, ok: true });
          } else {
            // No bills found for the user
            res.status(404).json({ bills:[], ok: false });
          }
      
      } else {
        // No user found with the given email
        res
          .status(404)
          .json({ message: "Authentication failed: User not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
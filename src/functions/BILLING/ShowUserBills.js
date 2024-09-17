import { pool, } from "../../../index.js";


export const showBills = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Query to check if the user exists and get the hashed password
      const userResult = await pool.query(
        "SELECT password FROM users WHERE email = $1",
        [email]
      );
  
      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
          // Passwords match, fetch the user's bills
          console.log("Authentication successful");
  
          const billsResult = await pool.query(
            "SELECT * FROM bills WHERE email = $1",
            [email]
          );
  
          if (billsResult.rows.length > 0) {
            // Send the bills in the response
            res.json(billsResult.rows);
          } else {
            // No bills found for the user
            res.status(404).json({ message: "No bills found for this user" });
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
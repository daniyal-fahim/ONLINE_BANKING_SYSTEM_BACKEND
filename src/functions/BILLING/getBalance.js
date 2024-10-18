import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js"; 

export const getbalance = async (req, res) => {
  let GId = getGId();
  console.log(GId);
   console.log("SOMEONE IS CALLING ME FOR GETTING THE BALANCE");
   const temp = await pool.query("SELECT balance FROM balance WHERE user_id = $1", [
     GId,
   ]);
   try {
     if (temp.rows.length > 0) {
       const user = temp.rows[0];
       const balance=user.balance;
       console.log("Balance retrieved:", balance);  // Debugging log
       res.json({ balance });
     } else {
       console.log("Authentication failed: User not found");
     }
   } catch (err) {
     console.error(err.message);
     res.status(500).json({ message: "Server error" });
   }
 };
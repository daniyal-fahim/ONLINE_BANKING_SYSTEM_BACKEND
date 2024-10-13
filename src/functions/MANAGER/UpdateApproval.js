import { pool } from "../../../index.js";

export const updateApproval = async (req, res) => {
   const { requestId, status } = req.body;

   try {
     if (requestId[0] === 'U' || requestId[0] === 'u') {
       // Update for users
       await pool.query("UPDATE users SET approved=$1 WHERE user_id=$2", [status, requestId]);
     } else if (requestId[0] === 'A' || requestId[0] === 'a') {
       // Update for administration
       await pool.query("UPDATE administration SET approved=$1 WHERE admin_id=$2", [status, requestId]);
     }

     res.status(200).json({ message: "Approval status updated successfully" });
   } catch (err) {
     res.status(500).json({ error: "An error occurred while updating approval status" });
   }
};

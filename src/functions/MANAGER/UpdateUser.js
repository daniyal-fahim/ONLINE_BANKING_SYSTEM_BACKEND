import { pool } from "../../../index.js";

export const updateUser = async (req, res) => {
  const {
    user_id,
    admin_id,
    dob,
    fname,
    lname,
    cnic,
    nationality,
    info,
    gender,
    email,
    designation,
    password,
  } = req.body;

  try {
    // Determine whether it's a user or admin based on the ID format
    if (user_id && (user_id[0] === 'U' || user_id[0] === 'u')) {
      // Update or insert for users
      await pool.query(
        `INSERT INTO users (user_id, dob, fname, lname, cnic, nationality, info, gender, email, password)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (user_id) 
         DO UPDATE SET dob = EXCLUDED.dob, fname = EXCLUDED.fname, lname = EXCLUDED.lname, cnic = EXCLUDED.cnic, 
           nationality = EXCLUDED.nationality, info = EXCLUDED.info, gender = EXCLUDED.gender, email = EXCLUDED.email, 
           password = EXCLUDED.password`,
        [user_id, dob, fname, lname, cnic, nationality, info, gender, email, password]
      );

    } else if (admin_id && (admin_id[0] === 'A' || admin_id[0] === 'a')) {
      // Update for administration
      await pool.query(
        `UPDATE administration 
         SET dob = $2, fname = $3, lname = $4, cnic = $5, nationality = $6, info = $7, gender = $8, 
             designation = $9, email = $10 
         WHERE admin_id = $1`,
        [admin_id, dob, fname, lname, cnic, nationality, info, gender, designation, email]
      );
    } else {
      return res.status(400).json({ error: "Invalid user or admin ID" });
    }

    res.status(200).json({ message: "Approval status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while updating approval status" });
  }
};

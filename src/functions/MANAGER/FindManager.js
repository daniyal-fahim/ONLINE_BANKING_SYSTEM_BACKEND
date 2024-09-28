import { pool, bcrypt } from "../../../index.js";

export const findManager = async (req, res) => {
  const { email, password } = req.body;
  const temp = await pool.query(
    "SELECT * FROM administration WHERE email = $1",
    [email]
  );
  try {
    if (temp.rows.length > 0) {
      const admin = temp.rows[0];
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        // Passwords match
        console.log("Authentication successful");
        console.log(admin);
        res.json(admin);
      } else {
        console.log("Authentication failed: Incorrect password");
      }
    } else {
      // No admin found with the given email
      console.log("Authentication failed: admin not found");
    }
  } catch (err) {
    console.error(err.message);
    let msg = "Server error " + err.message;
    res.status(500).json({ message: msg });
  }
};

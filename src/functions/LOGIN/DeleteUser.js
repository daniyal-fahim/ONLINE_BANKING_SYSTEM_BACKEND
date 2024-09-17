import { pool, bcrypt} from "../../../index.js";


export const delete1 = async (req, res) => {
    const { email, password } = req.body;
    const temp = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    try {
      if (temp.rows.length > 0) {
        const user = temp.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Passwords match
          console.log("Authentication successful");
          res.send("USER HAS BEERM DELETED SUCCESSFULLY");
          const temp1 = await pool.query("DELETE FROM users WHERE email = $1", [
            email,
          ]);
        } else {
          // Passwords do not match
          console.log("Authentication failed: Incorrect password");
        }
      } else {
        // No user found with the given email
        console.log("Authentication failed: User not found");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };

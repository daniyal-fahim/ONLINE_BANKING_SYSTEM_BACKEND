import { pool, bcrypt} from "../../../index.js";


export const register = async (req, res) => {
    const { email, password, fname, lname, nationality, gender, balance } =
      req.body;
  
    try {
      // Check if the user already exists
      const userExists = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new user into the database
      await pool.query(
        "INSERT INTO users (email, password,fname,lname,nationality,gender) VALUES ($1, $2,$3,$4,$5,$6)",
        [email, hashedPassword, fname, lname, nationality, gender]
      );
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
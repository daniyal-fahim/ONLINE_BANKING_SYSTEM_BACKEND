import pool from "../../config/db.js";
import { bcrypt } from "../../config/auth.js";
import { jwt } from "../../config/auth.js";
import { secret } from "../../config/auth.js";

import { setGId } from "./getUserId.js";

export const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if the user exists
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      const user_id=user.user_id;

      if (match) {
        setGId(user_id);

        var data = {
          user_id,
        };

        var token = jwt.sign(
          {
            data,
          },
          secret,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 3600000,
          path: "/",
          domain: "localhost",
        });

        console.log("Authentication successful");
        console.log(token);
        res.status(200).json({
          ok: true,
          message: "Login successful!",
        });
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
    let msg="Server error "+err.message ;
    res.status(500).json({ message: msg  });
  }
};

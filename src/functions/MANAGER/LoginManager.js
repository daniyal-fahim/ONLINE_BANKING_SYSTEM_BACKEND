import pool from "../../config/db.js";
import { bcrypt } from "../../config/auth.js";
import { jwt } from "../../config/auth.js";
import { secret } from "../../config/auth.js";
import { setGId } from "../LOGIN/getUserId.js";

export const loginManager = async (req, res) => {

  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM administration WHERE email = $1", [
      email,
    ]);

    // Check if the user exists
    if (result.rows.length > 0) {
      const manager = result.rows[0];
      const match = await bcrypt.compare(password, manager.password);
      const admin_id=manager.admin_id;
      const approved=user.Approved;
      if (match && approved) {
        setGId(admin_id);
        var user_id=admin_id;
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
          token:token
        });
      } else {
        if(!approved){
          return res.status(404).json({ message: "Your Account is not approved wait 1 working day after signup or Contact your nearest branch" });
 
        }
        console.log("Authentication failed: Incorrect password");
        return res.status(404).json({ message: "Authentication failed: Incorrect password" });

      }
    } else {
      // No user found with the given email
      console.log("Authentication failed: User not found");
      return res.status(404).json({ message: "Authentication failed:  User not found" });

    }
  } catch (err) {
    console.error(err.message);
    let msg="Server error "+err.message ;
    res.status(500).json({ message: msg  });
  }
};

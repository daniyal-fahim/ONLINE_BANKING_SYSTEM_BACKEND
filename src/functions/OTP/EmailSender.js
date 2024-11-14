import transporter from "../../config/mailer.js";
import pool from "../../config/db.js";
import { setOTP } from "./getOtp.js";
import { getGId } from "../LOGIN/getUserId.js";

export const EmailSender = async (req, res) => {
  try {
    const { email1, fname, lname } = req.body;
    var email=email1;
    let username = fname ? `${fname} ${lname}` : '';
    let otp = Math.floor(Math.random() * 99999);

    if (!email) {
      const user_id = getGId();
      if(user_id[0]=='U')
        {const temp = await pool.query(
        "SELECT lname, fname, email FROM users WHERE user_id = $1",
        [user_id]
      );
    
      if (temp.rows.length > 0) {
        const user = temp.rows[0];
        username = `${user.fname} ${user.lname}`;
        email = user.email;
        console.log(email +' '+ username);
      } else {
        return res.status(404).json({ message: "User not found" });
      }}
      else{
        const temp = await pool.query(
          "SELECT lname, fname, email FROM administration WHERE admin_id = $1",
          [user_id]
        );
      
        if (temp.rows.length > 0) {
          const user = temp.rows[0];
          username = `${user.fname} ${user.lname}`;
          email = user.email;
          console.log(email +' '+ username);
        } else {
          return res.status(404).json({ message: "Admin not found" });
        }
      }
    }

    const msg = `
Dear ${username},

For enhanced security of your [Banking App Name] account, we have implemented a Two-Factor Authentication (2FA) process to ensure only you can access your account. This additional layer of security protects your personal information from unauthorized access.

Your One-Time Verification Code
Your secure access code is: ${otp}

Please enter this code on the authentication page within the next 10 minutes to complete your login. For security reasons, this code will expire after 10 minutes, and a new one will be required if this time lapses.

What to Do if You Did Not Request This Code
If you did not initiate this login attempt, please disregard this email and notify us immediately by contacting our customer support team at [support email] or [support phone number].

At D PAY, we are committed to keeping your personal information safe and secure. Thank you for choosing us as your trusted banking partner.

Best regards,
The D Pay Security Team
    `;

    const receivers = [
      email,
      "daniyal236fahim@gmail.com",
      "k224167@nu.edu.pk",
      "k224663@nu.edu.pk",
    ];

    const info = await transporter.sendMail({
      from: '"D pay" <daniyal237fahim@gmail.com>',
      to: receivers,
      subject: "DPAY TWO FACTOR AUTHENTICATION",
      text: msg,
    });

    setOTP(otp);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

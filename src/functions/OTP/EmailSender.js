import { transporter, pool } from "../../../index.js";
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
      const temp = await pool.query(
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
      }
    }

    const msg = `
      Dear ${username},
      ...
      Your OTP: ${otp}
      ...
      Best regards,
      D-Pay Support Team
      [Your Contact Information]
      [Support Email/Phone Number]
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

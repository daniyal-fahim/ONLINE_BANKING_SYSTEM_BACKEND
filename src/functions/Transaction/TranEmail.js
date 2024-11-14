import transporter from "../../config/mailer.js";
import pool from "../../config/db.js";
import { setOTP } from "../OTP/getOtp.js";
import { getGId } from "../LOGIN/getUserId.js";

export const TransactionEmail = async (rnum, rname, amount) => {
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

We are pleased to inform you that a funds transfer request has been successfully initiated through our app. Below are the details of the transaction for your reference:

Receiver Details:

Account Number: ${rnum}
Name: ${rname}
Amount: ${amount}
Please verify the transaction details and contact our support team if you have any questions or require further assistance.

Thank you for choosing our services!



Best regards,
D Pay Support Team
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
      subject: "Funds Transfer Confirmation",
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

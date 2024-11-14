import transporter from "../../config/mailer.js";
import pool from "../../config/db.js";
import { setOTP } from "../OTP/getOtp.js";
import { getGId } from "../LOGIN/getUserId.js";

export const BillEmail = async (selectedBill, accnum, amount,company) => {
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

We are pleased to inform you that your recent bill payment was successfully processed. Here are the details of the transaction for your reference:

Service Provider/Company: ${{company}}
Bill Type: ${{selectedBill}} 
Account Number : ${{accnum}} 
Total Amount: ${{amount}}

Thank you for using our platform to manage your payments quickly and securely. If you have any questions about this transaction, please don’t hesitate to reach out to our support team at [Support Email/Contact Information].

Note: Please retain this email for your records. If you encounter any issues, we are here to help.

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
      subject: "Bill Payment Confirmation",
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

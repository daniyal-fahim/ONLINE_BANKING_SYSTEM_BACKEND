import transporter from "../../config/mailer.js";
import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";

export const TransactionEmail = async (rnum, rname, amount, userEmail, firstName, lastName) => {
  try {
    let email = userEmail;
    let username = firstName && lastName ? `${firstName} ${lastName}` : '';
 

    // Fetch user details from the database if email is not provided
    if (!email) {
      const user_id = getGId();
      let query = '';
      
      if (user_id[0] === 'U') {
        query = "SELECT lname, fname, email FROM users WHERE user_id = $1";
      } else {
        query = "SELECT lname, fname, email FROM administration WHERE admin_id = $1";
      }

      const temp = await pool.query(query, [user_id]);

      if (temp.rows.length > 0) {
        const user = temp.rows[0];
        username = `${user.fname} ${user.lname}`;
        email = user.email;
      } else {
        throw new Error(user_id[0] === 'U' ? "User not found" : "Admin not found");
      }
    }

    const msg = `
      Dear ${username},

      We are pleased to inform you that a funds transfer request has been successfully initiated through our app. Below are the details of the transaction for your reference:

      Receiver Details:
      - Account Number: ${rnum}
      - Name: ${rname}
      - Amount: ${amount}

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

    // Send the email
    const info = await transporter.sendMail({
      from: '"D Pay" <daniyal237fahim@gmail.com>',
      to: receivers,
      subject: "Funds Transfer Confirmation",
      text: msg,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Server error: ", err.message);
    return { success: false, error: err.message };
  }
};

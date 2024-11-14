import transporter from "../../config/mailer.js";
import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";

export const BillEmail = async (selectedBill, accnum, amount, company, userEmail, firstName, lastName) => {
  try {
    let email = userEmail;
    let username = firstName && lastName ? `${firstName} ${lastName}` : '';

    
    // If email is not provided, fetch user details from the database
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
      } else {
        throw new Error("User not found");
      }
    }

    // Compose the email message
    const msg = `
      Dear ${username},

      We are pleased to inform you that your recent bill payment was successfully processed. Here are the details:

      Service Provider/Company: ${company}
      Bill Type: ${selectedBill}
      Account Number: ${accnum}
      Total Amount: ${amount}

      Thank you for using our platform to manage your payments. If you have any questions, please contact support.

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
      subject: "Bill Payment Confirmation",
      text: msg,
    });

  
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Server error: ", err.message);
    return { success: false, error: err.message };
  }
};

import transporter from "../../config/mailer.js";
import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";

export const LoanEmail = async (loanType, loanAmount, tenure, installmentAmount, userEmail, firstName, lastName) => {
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

      We are pleased to inform you that your loan application has been submitted successfully. Here are the details of your loan request:

      Loan Type: ${loanType}
      Loan Amount: ${loanAmount}
      Tenure: ${tenure} years
      Monthly Installment: ${installmentAmount.toFixed(2)}

      Our team will review your application, and you will receive further updates on the status shortly. If you have any questions, please feel free to reach out to our support team.

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
      subject: "Loan Application Submission Confirmation",
      text: msg,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Server error: ", err.message);
    return { success: false, error: err.message };
  }
};

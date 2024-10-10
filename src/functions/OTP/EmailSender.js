import { transporter, pool } from "../../../index.js";
import { setOTP } from "./getOtp.js";
import { getGId } from "../LOGIN/getUserId.js";
export const EmailSender = async (req, res) => {
  var {email,fname,lname} = req.body;
  
  var username=fname + " " + lname;
  let otp = Math.floor(Math.random() * 99999);
  if (email === null) {
    const user_id = getGId();
    try {
      const temp = await pool.query(
        "SELECT lname,fname,email FROM users WHERE user_id = $1",
        [user_id]
      );

      if (temp.rows.length > 0) {
        const user = temp.rows[0];
        const name = user.fname + " " + user.lname;
        username=name;
        email=user.email;
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error(err.message);
      let msg = "Server error: " + err.message;
      res.status(500).json({ message: msg });
    }
  }
  // Send mail with defined transport object
  var msg = `
    Dear ${username},

    I hope this message finds you well.
    
    For your security, we have generated a One-Time Password (OTP) to ensure secure access to your D-Pay account. 
    Please use the OTP provided below to complete your authentication process:
    
    Your OTP: ${otp}
    
    This OTP is valid for the next [5 minutes] and is required to proceed with your transaction or account activity. 
    For your protection, please do not share this code with anyone. 
    If you did not request this OTP or suspect any unauthorized activity on your account, please contact our support team immediately.
    Thank you for choosing D-Pay. We are committed to maintaining the highest standards of security to protect your information.
    
    If you have any questions or need further assistance, feel free to reach out.
    
    Best regards,
    D-Pay Support Team
    [Your Contact Information]
    [Support Email/Phone Number]`;
  const receivers = [
    email,
    "daniyal236fahim@gmail.com",
    "k224167@nu.edu.pk",
    "k224663@nu.edu.pk",
  ];

  const info = await transporter.sendMail({
    from: '"D pay" <daniyal237fahim@gmail.com>', // sender address (hardcoded)
    to: receivers, // list of receivers
    subject: "DPAY TWO FACTOR AUTHENTICATION", // Subject line
    text: `${msg}`, // plain text body
  });
  setOTP(otp);
  console.log("Message sent: %s", info.messageId);
};

// Call the main function and handle errors
EmailSender().catch(console.error);

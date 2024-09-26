import { transporter,pool } from "../../../index.js";
import { setOTP } from "./getOtp.js";
import { getGemail } from "../LOGIN/getUserEmail.js";
export const EmailSender = async (req, res) => {
  let otp = Math.floor(Math.random() * 99999);

  const email=getGemail();
  // Send mail with defined transport object
    var msg=`
    Dear [Client's Name],

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
      "daniyal236fahim@gmail.com",
      "k224282@nu.edu.pk",
      "k224167@nu.edu.pk",
      "k224663@nu.edu.pk"
  ];
  
  const info = await transporter.sendMail({
    from: '"D pay" <daniyal237fahim@gmail.com>', // sender address (hardcoded)
    to: receivers, // list of receivers
    subject: "DPAY TWO FACTOR ATUTHENTICATION", // Subject line
    text: `${msg}`, // plain text body
  });
  setOTP(otp);
  console.log("Message sent: %s", info.messageId);
};

// Call the main function and handle errors
EmailSender().catch(console.error);

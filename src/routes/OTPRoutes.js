import express from 'express';
 const router = express.Router();


//sample otp ROUTE
import { EmailSender } from '../functions/OTP/EmailSender.js';
import { CheckOTP } from '../functions/OTP/CheckOTP.js';

//OTP ROUTE
router.post("/sendemail",EmailSender);

router.post("/checkotp",CheckOTP);

export default router;

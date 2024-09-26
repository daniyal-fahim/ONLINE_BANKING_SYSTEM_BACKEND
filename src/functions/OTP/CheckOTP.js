import { getOTP } from "./getOtp.js";

export const CheckOTP = async (req,res)=>{
const {otp} = req.body;
if(otp == getOTP()){
    res.status(200).json({ message: "OTP IS CORRECT" });
}
else
{
    res.status(500).json({ message: "OTP IS INCORRECT" });
}
}
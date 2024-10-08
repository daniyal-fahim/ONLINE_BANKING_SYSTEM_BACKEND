import express from 'express';
 const router = express.Router();
// const router = express();

// import {  find, register, delete1 ,billing,showBills,authenticateToken,getbalance} from "../functions/login.js"
// Sample LOGIN ROUTE
import { login } from "../functions/LOGIN/LoginUser.js";
import { find } from '../functions/LOGIN/FindUser.js';
import { register } from "../functions/LOGIN/RegisterUser.js"
import { delete1 } from "../functions/LOGIN/DeleteUser.js"
import {authenticateToken} from "../functions/LOGIN/AuthenticateUser.js"
import { getEmail } from '../functions/LOGIN/getUserEmail.js';

//SAMPLE BILLING ROUTE
import{billing} from "../functions/BILLING/NewBill.js";
import { showBills } from '../functions/BILLING/ShowUserBills.js';
import { getbalance } from '../functions/BILLING/getBalance.js';

//sample otp ROUTE
import { EmailSender } from '../functions/OTP/EmailSender.js';
import { CheckOTP } from '../functions/OTP/CheckOTP.js';


//sample manager routes
import { registerManager } from '../functions/MANAGER/RegisterManager.js';
import { loginManager } from '../functions/MANAGER/LoginManager.js';
import { deleteManager } from '../functions/MANAGER/DeleteManager.js';
import { findManager } from '../functions/MANAGER/FindManager.js';

import { getAllUnauthorized } from '../functions/MANAGER/getverified.js';
//getting all user getter
import { getuseraccountnumber,getusercnic,getuseremail,getuserfname,getuserupdatetime,getuserjoindate,getuserid } from '../functions/LOGIN/userallgetter.js';
import { getuserfullname,getusernationality,getuserlname,getuserinfo,getuserapproval,getuserdob } from '../functions/LOGIN/userallgetter.js';

//transaction route
import { interbanktransaction } from '../functions/Transaction/interbanktransaction.js';

import { generateid } from '../functions/generatenewid.js';
//just checking
router.get("/generateid",generateid);
//history router
import { getbillhistory,gettranshistory } from '../functions/History/getfullhistory.js';

//admin getter route work pending in this module
router.get('/',);
router.get('/',);
router.get('/',);
router.get('/',);
router.get('/',);
router.get('/',);
router.get('/',);
router.get('/',);

router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

//Authentication
router.post("/login", login);
router.post("/register", register);

router.post("/registermanager",registerManager);
router.post("/loginmanager",loginManager);


router.use(authenticateToken);

//user route
router.get("/getemail",getEmail)

router.post("/find", find);

router.post("/delete",delete1);

router.post("/billing",billing);
//manager routes
router.post("/findmanager",findManager);

router.post("/deletemanager",deleteManager);

router.get("/getunapprove",getAllUnauthorized);

//billing route

router.get("/showbill",showBills);

router.get("/getbalance",getbalance);

//OTP ROUTE
router.get("/sendemail",EmailSender);

router.post("/checkotp",CheckOTP);


router.get('/getuseraccountnumber',getuseraccountnumber);
router.get('/getusercnic',getusercnic);
router.get('/getuseremail',getuseremail);
router.get('/getuserfname',getuserfname);
router.get('/getuserupdatetime',getuserupdatetime);
router.get('/getuserjoindate',getuserjoindate);
router.get('/getuserid',getuserid);
router.get('/getusernationality',getusernationality);
router.get('/getuserlname',getuserlname);
router.get('/getuserinfo',getuserinfo);
router.get('/getuserapproval',getuserapproval);
router.get('/getuserdob',getuserdob);
//for user sidebar access
router.get('/getuserfullname',getuserfullname);


router.post('/interbanktransaction',interbanktransaction);

//history
router.get('/getbillhistory',getbillhistory);
router.get('/gettranshistory',gettranshistory);


//faqs
import { GiveAnswer } from '../functions/FAQS/GiveAnswer.js';
import { AskQuestion } from '../functions/FAQS/AskQuestion.js';
import { showallfaqs } from '../functions/FAQS/ShowAllFaqs.js';
import { showunresponsefaqs } from '../functions/FAQS/ResponseToFaq.js';

router.get('/showallfaqs',showallfaqs);
router.get('/showunresponse',showunresponsefaqs);
router.post('/askques',AskQuestion);
router.post('/giveanswer',GiveAnswer);

//get month bill
import { getusermonthusage } from '../functions/LOGIN/MonthlyUsage.js';
import { getUserDailyUsage } from '../functions/LOGIN/MonthlyUsage.js';

router.get('/getmonthexpense',getusermonthusage);
router.get('/getdailyexpense',getUserDailyUsage);
//GET LOAN

import { newloanreq } from '../functions/LOAN/newloan.js';
router.post('/newloan',newloanreq);

export default router;

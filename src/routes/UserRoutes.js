import express from 'express';
const router = express.Router();


import { find } from '../functions/LOGIN/FindUser.js';
import { delete1 } from "../functions/LOGIN/DeleteUser.js";


// Getting all user getter
import { getuseraccountnumber, getusercnic, getuseremail, getuserfname, getuserupdatetime, getuserjoindate, getuserid } from '../functions/LOGIN/userallgetter.js';
import { getuserfullname, getusernationality, getuserlname, getuserinfo, getuserapproval, getuserdob } from '../functions/LOGIN/userallgetter.js';
import { getusermonthusage } from '../functions/LOGIN/MonthlyUsage.js';
import { getUserDailyUsage } from '../functions/LOGIN/MonthlyUsage.js';
import { getUserCount } from '../functions/MANAGER/UserCount.js';
import { generateid } from '../functions/generatenewid.js';
import { getbankdailyusage } from '../functions/LOGIN/BankMonthlyUsage.js';
import { getbankcurrentmonthusage } from '../functions/LOGIN/bankthismonthusage.js';
// Route to generate a new ID (No authentication needed)
router.get("/generateid", generateid);

// Default user route
router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

// Login and register should not require authentication


// Routes requiring authentication
router.post("/find", find);
router.post("/delete", delete1);
router.get('/getuseraccountnumber', getuseraccountnumber);
router.get('/getusercnic', getusercnic);
router.get('/getuseremail', getuseremail);
router.get('/getuserfname', getuserfname);
router.get('/getuserupdatetime', getuserupdatetime);
router.get('/getuserjoindate', getuserjoindate);
router.get('/getuserid', getuserid);
router.get('/getusernationality', getusernationality);
router.get('/getuserlname', getuserlname);
router.get('/getuserinfo', getuserinfo);
router.get('/getuserapproval', getuserapproval);
router.get('/getuserdob', getuserdob);
router.get('/getuserfullname', getuserfullname);
router.get('/getmonthexpense', getusermonthusage);
router.get('/getdailyexpense', getUserDailyUsage);
router.get('/getbankdailyexpense', getbankdailyusage);

router.get('/getusercount',getUserCount);
router.get('/getbankcurrentmonthusage',getbankcurrentmonthusage)
export default router;

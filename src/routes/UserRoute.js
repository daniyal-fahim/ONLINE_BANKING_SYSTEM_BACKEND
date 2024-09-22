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


router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

//Authentication
router.post("/login", login);

router.post("/register", register);

router.use(authenticateToken);

router.get("/getemail",getEmail)

router.post("/find", find);

router.post("/delete",delete1);

router.post("/billing",billing);

router.get("/showbill",showBills);

router.get("/getbalance",getbalance);

export default router;

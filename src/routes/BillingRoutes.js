import express from 'express';
 const router = express.Router();

 import{billing} from "../functions/BILLING/NewBill.js";
 import { showBills } from '../functions/BILLING/ShowUserBills.js';
 import { getbalance } from '../functions/BILLING/getBalance.js';


router.post("/billing",billing);
router.get("/showbill",showBills);
router.get("/getbalance",getbalance);

export default router;
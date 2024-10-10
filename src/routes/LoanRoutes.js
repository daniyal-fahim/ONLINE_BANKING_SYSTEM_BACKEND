import express from 'express';
 const router = express.Router();

 import { newloanreq } from '../functions/LOAN/newloan.js';


 router.post('/newloan',newloanreq);

 export default router;
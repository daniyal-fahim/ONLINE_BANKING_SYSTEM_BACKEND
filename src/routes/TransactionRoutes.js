
import express from 'express';
 const router = express.Router();
import { interbanktransaction } from '../functions/Transaction/interbanktransaction.js';



router.post('/interbanktransaction',interbanktransaction);


export default router;
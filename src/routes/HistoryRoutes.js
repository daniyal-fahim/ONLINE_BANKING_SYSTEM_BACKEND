
import express from 'express';
 const router = express.Router();


import { getbillhistory,gettranshistory } from '../functions/History/getfullhistory.js';

router.get('/getbillhistory',getbillhistory);

router.get('/gettranshistory',gettranshistory);

export default router;

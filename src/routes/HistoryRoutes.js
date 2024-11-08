
import express from 'express';
 const router = express.Router();


import { getbillhistory,gettranshistory } from '../functions/History/getfullhistory.js';
import { getfullbillhistory,getfulltranshistory } from '../functions/History/GetFullHistoryForManager.js';
router.get('/getbillhistory',getbillhistory);

router.get('/gettranshistory',gettranshistory);


router.get('/getfullbillhistory',getfullbillhistory);

router.get('/getfulltranshistory',getfulltranshistory);
export default router;

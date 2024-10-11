
import express from 'express';
 const router = express.Router();

import { getCardDetail } from '../functions/CARD/GetCardDetail.js';
import { checkstatus} from '../functions/CARD/checkStatus.js';
import { addCard } from '../functions/CARD/AddCard.js';
import { checkPin } from '../functions/CARD/CheckPin.js';

router.post("/checkpin",checkPin)
router.get("/checkcardstatus",checkstatus);
router.post("/addcard",addCard);
router.get("/carddetail",getCardDetail);

export default router;
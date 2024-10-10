import express from 'express';
 const router = express.Router();

import { GiveAnswer } from '../functions/FAQS/GiveAnswer.js';
import { AskQuestion } from '../functions/FAQS/AskQuestion.js';
import { showallfaqs } from '../functions/FAQS/ShowAllFaqs.js';
import { showunresponsefaqs } from '../functions/FAQS/ResponseToFaq.js';


router.get('/showallfaqs',showallfaqs);
router.get('/showunresponse',showunresponsefaqs);
router.post('/askques',AskQuestion);
router.post('/giveanswer',GiveAnswer);

export default router;
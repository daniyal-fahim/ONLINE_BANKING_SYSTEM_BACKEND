import express from 'express';

 const router = express.Router();

 import { deleteManager } from '../functions/MANAGER/DeleteManager.js';
 import { findManager } from '../functions/MANAGER/FindManager.js';
 import { getAllUnauthorized } from '../functions/MANAGER/getverified.js';




router.post("/findmanager",findManager);
router.post("/deletemanager",deleteManager);
router.get("/getunapprove",getAllUnauthorized);

export default router;
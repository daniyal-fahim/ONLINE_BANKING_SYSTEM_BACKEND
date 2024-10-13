import express from 'express';

 const router = express.Router();

 import { deleteManager } from '../functions/MANAGER/DeleteManager.js';
 import { findManager } from '../functions/MANAGER/FindManager.js';
 import { getAllUnauthorized } from '../functions/MANAGER/getverified.js';



router.post("/findmanager",findManager);
router.post("/deletemanager",deleteManager);
router.get("/getunapprove",getAllUnauthorized);



//update routes
import { updateApproval } from '../functions/MANAGER/UpdateApproval.js';
import { FindUser } from '../functions/MANAGER/FindParticularUser.js';
import { getAllUser } from '../functions/MANAGER/GetAllUser.js';

router.get("/getalluser",getAllUser);//return all the admn and the users in the database
router.post("/finduser",FindUser); //recieves an id whether user or admin and return the user full detail

router.post("/updateapproval",updateApproval);
export default router;
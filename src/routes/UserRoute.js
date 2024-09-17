import express from 'express';
 const router = express.Router();
// const router = express();

import { login, find, register, delete1 ,billing,showBills,authenticateToken} from "../functions/login.js"
// Sample user route

router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

//Authentication
router.post("/login", login);


//the admin will find the user details if he wants details


//TO register the new user for the first time 
router.post("/register", register);

router.use(authenticateToken);

router.post("/find", find);

router.post("/delete",delete1);

router.post("/billing",billing);

router.post("/showbill",showBills);

export default router;

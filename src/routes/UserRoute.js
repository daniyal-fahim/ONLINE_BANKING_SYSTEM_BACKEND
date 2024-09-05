import express from 'express';
 const router = express.Router();
// const router = express();

import { login, find, register, delete1 } from "../functions/login.js"
// Sample user route

router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

//Authentication
router.post("/login", login);

//the admin will find the user details if he wants details
router.post("/find", find);

//TO register the new user for the first time 
router.post("/register", register);

router.post("/delete",delete1);


export default router;

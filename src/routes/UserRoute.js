import express from 'express';
const router = express.Router();
import { login, find, register } from "../functions/login.js"
// Sample user route
router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

router.post("/login", login);

//the admin will find the user details if he wants details
router.post("/find", );

//TO register the new user for the first time 
router.post("/register", register);


export default router;

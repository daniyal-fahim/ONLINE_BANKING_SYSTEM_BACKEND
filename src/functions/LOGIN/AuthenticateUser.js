import { pool, bcrypt, jwt, secret } from "../../../index.js";
import { setGId } from "./getUserId.js";

export const authenticateToken = (req, res, next)=> {
  
    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect('/login'); 
    }
  
    jwt.verify(token, secret, (err, user) => { // Use the same secret here
      if (err) {
        res.clearCookie("token"); // Clear the invalid token
            return res.redirect('/login'); // Invalid token
      }
      console.log('Token Verified:', user);
  
      req.user = user; 
console.log(` AUTHENTICATED AS DoNE HIS WORK BY ADDING THE EMAIL ${user.data.user_id}`);
     setGId(user.data.user_id);
      next(); 
    });
  };
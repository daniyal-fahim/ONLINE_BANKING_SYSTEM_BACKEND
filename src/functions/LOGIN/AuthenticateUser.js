import { pool, bcrypt, jwt, secret } from "../../../index.js";

export const authenticateToken = (req, res, next)=> {
    // console.log('Cookies in request:', req.cookies); // Log the cookies
  
    const token = req.cookies.token; // Retrieve token from cookies
    // console.log('Token:', req.cookies.token); // Log the token for debugging
    // console.log('I AM CALLED YOU DONT WORRY');
  
    if (!token) {
      return res.redirect('/login'); 
    }
  
    jwt.verify(token, secret, (err, user) => { // Use the same secret here
      if (err) {
        res.clearCookie("token"); // Clear the invalid token
            return res.redirect('/login'); // Invalid token
      }
      console.log('Token Verified:', user);
  
      req.user = user; // Attach decoded user to request
      next(); // Proceed to the next middleware
    });
  };
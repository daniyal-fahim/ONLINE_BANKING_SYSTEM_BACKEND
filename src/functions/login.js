import pool from "../../config/db.js";
import { bcrypt } from "../../config/auth.js";
import { jwt } from "../../config/auth.js";
import { secret } from "../../config/auth.js";
var Gemail = "DANI@GM";
// var secret='secret';
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     // Check if the user exists
//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       const match = await bcrypt.compare(password, user.password);

//       if (match) {
//         // Passwords match
//         Gemail = email;
        
//         var data = {
//           email
//         };

//         var token = jwt.sign(
//           {
//             data,
//           },
//          secret,
//           { expiresIn: "1h" }
//         );

//         res.cookie('token', token, {
//           httpOnly: true,           
//           secure: false,           
//           sameSite: 'Strict',      
//           maxAge: 3600000,         
//           path: '/',               
//           domain: 'localhost',      
//         });
        
//         console.log("Authentication successful");
//         console.log(token);
//         res.status(200).json({
//           ok: true,  
//           message: "Login successful!", 
//         });
//       } else {
//         // Passwords do not match
//         console.log("Authentication failed: Incorrect password");
//       }
//     } else {
//       // No user found with the given email
//       console.log("Authentication failed: User not found");
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const find = async (req, res) => {
//   const { email, password } = req.body;
//   const temp = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);
//   try {
//     if (temp.rows.length > 0) {
//       const user = temp.rows[0];
//       const match = await bcrypt.compare(password, user.password);
//       if (match) {
//         // Passwords match
//         console.log("Authentication successful");
//         console.log(user);
//         res.json(user);
//       } else {
//         console.log("Authentication failed: Incorrect password");
//       }
//     } else {
//       // No user found with the given email
//       console.log("Authentication failed: User not found");
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getbalance = async (req, res) => {
//    var email=Gemail;
//   console.log("SOMEONE IS CALLING ME FOR GETTING THE BALANCE");
//   const temp = await pool.query("SELECT balance FROM users WHERE email = $1", [
//     email,
//   ]);
//   try {
//     if (temp.rows.length > 0) {
//       const user = temp.rows[0];
//       const balance=user.balance;
//       console.log("Balance retrieved:", balance);  // Debugging log
//       res.json({ balance });
//     } else {
//       console.log("Authentication failed: User not found");
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const register = async (req, res) => {
//   const { email, password, fname, lname, nationality, gender, balance } =
//     req.body;

//   try {
//     // Check if the user already exists
//     const userExists = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );
//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user into the database
//     await pool.query(
//       "INSERT INTO users (email, password,fname,lname,nationality,gender) VALUES ($1, $2,$3,$4,$5,$6)",
//       [email, hashedPassword, fname, lname, nationality, gender]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const delete1 = async (req, res) => {
//   const { email, password } = req.body;
//   const temp = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);
//   try {
//     if (temp.rows.length > 0) {
//       const user = temp.rows[0];
//       const match = await bcrypt.compare(password, user.password);
//       if (match) {
//         // Passwords match
//         console.log("Authentication successful");
//         res.send("USER HAS BEERM DELETED SUCCESSFULLY");
//         const temp1 = await pool.query("DELETE FROM users WHERE email = $1", [
//           email,
//         ]);
//       } else {
//         // Passwords do not match
//         console.log("Authentication failed: Incorrect password");
//       }
//     } else {
//       // No user found with the given email
//       console.log("Authentication failed: User not found");
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const data = {};
// export const billing = async (req, res) => {
//   const { selectedBill, Id, Amount,Company, Username, Check, Month, Email, Address } =
//     req.body;
//   const selectedCompany = Company; // Set selectedCompany
//   var newbal;
//   // const Check=true;
//   //const Gemail = Email; // Assuming Gemail is the same as Email from req.body

//   try {
//     // Check if the user has enough balance
//     const temp = await pool.query(
//       "SELECT balance FROM users WHERE email = $1",
//       [Gemail]
//     );

//     if (temp.rows.length > 0) {
//       const user = temp.rows[0];
//       console.log(user.balance);
//       newbal = user.balance;
//       if (Number(user.balance) > Number(Amount)) 
//         {
//         // Insert into the bills table
//         await pool.query(
//           'INSERT INTO bills (selectedBill, selectedCompany, AccNum, Amount, Username, Month1, BillEmail, "Check", Address, Email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
//           [
//             selectedBill,
//             selectedCompany,
//             Id,
//             Amount,
//             Username,
//             Month,
//             Email,
//             Check,
//             Address,
//             Gemail,
//           ]
//         );

//         // Optionally update the user's balance by deducting the bill amount
//         await pool.query(
//           "UPDATE users SET balance = balance - $1 WHERE email = $2",
//           [Amount, Gemail]
//         );

//         const temp = await pool.query(
//           "SELECT balance FROM users WHERE email = $1",
//           [Gemail]
//         );

//         if (temp.rows.length > 0) {
//           const user = temp.rows[0];
//           console.log(user.balance);
//           newbal = user.balance;
//         }
//         res.status(200).json({
//           message: "Bill added and balance updated successfully",
//           newbal,
//         });
//       } else {
//         res.status(400).json({ message: "Insufficient balance" });
//       }
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const showBills = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Query to check if the user exists and get the hashed password
//     const userResult = await pool.query(
//       "SELECT password FROM users WHERE email = $1",
//       [email]
//     );

//     if (userResult.rows.length > 0) {
//       const user = userResult.rows[0];

//       // Compare the provided password with the stored hashed password
//       const match = await bcrypt.compare(password, user.password);

//       if (match) {
//         // Passwords match, fetch the user's bills
//         console.log("Authentication successful");

//         const billsResult = await pool.query(
//           "SELECT * FROM bills WHERE email = $1",
//           [email]
//         );

//         if (billsResult.rows.length > 0) {
//           // Send the bills in the response
//           res.json(billsResult.rows);
//         } else {
//           // No bills found for the user
//           res.status(404).json({ message: "No bills found for this user" });
//         }
//       } else {
//         // Passwords do not match
//         res
//           .status(401)
//           .json({ message: "Authentication failed: Incorrect password" });
//       }
//     } else {
//       // No user found with the given email
//       res
//         .status(404)
//         .json({ message: "Authentication failed: User not found" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const authenticateToken = (req, res, next)=> {
//   console.log('Cookies in request:', req.cookies); // Log the cookies

//   const token = req.cookies.token; // Retrieve token from cookies
//   console.log('Token:', req.cookies.token); // Log the token for debugging
//   console.log('I AM CALLED YOU DONT WORRY');

//   if (!token) {
//     return res.sendStatus(403); // Forbidden if no token
//   }

//   jwt.verify(token, secret, (err, user) => { // Use the same secret here
//     if (err) {
//       res.clearCookie("token");
//       return res.sendStatus(403); // Invalid token
//     }
//     console.log('Token Verified:', user);

//     req.user = user; // Attach decoded user to request
//     next(); // Proceed to the next middleware
//   });
// };
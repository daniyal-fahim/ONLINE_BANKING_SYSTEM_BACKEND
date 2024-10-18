import express from "express";
import bodyparser from "body-parser";
import pkg from "pg";
import nodemailer from "nodemailer";
const { Pool } = pkg;
import bcrypt from "bcryptjs";
import userRouter from "./src/routes/UserRoute.js"
import cors from 'cors';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'


dotenv.config();
//routes
import Billing from "./src/routes/BillingRoutes.js";
import Otp from "./src/routes/OTPRoutes.js";
import Transaction from "./src/routes/TransactionRoutes.js";
import Manager from "./src/routes/ManagerRoutes.js";
import History from "./src/routes/HistoryRoutes.js";
import User from "./src/routes/UserRoutes.js";
import FAQ from "./src/routes/FaqRoutes.js";
import Loan from "./src/routes/LoanRoutes.js"
import withoutauth from "./src/routes/register without auth.js"
import card from "./src/routes/CardRoutes.js"
const corsOptions ={
    origin:'http://localhost:3000', //FRONYEND RUNNING AT 3000
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const secret = 'your_secret_key';

const app = express();
const port = 5000; //BACKEND RUNNING AT 5000

//configuring node mailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail service
  auth: {
    user:process.env.EMAIL, // Your Gmail email (hardcoded)
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password or App Password (hardcoded)
  },
});


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

 //Configuring the Postgres server as pool
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "D_PAY",//"BANKING WORLD",
//   password: "FAST",
//   port: 5432,
// });
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// app.use("/",userRouter);
app.use('/',withoutauth);
app.use('/', Otp);

import { authenticateToken } from "./src/functions/LOGIN/AuthenticateUser.js";
app.use(authenticateToken);
app.use('/', User);
app.use('/', Billing);
app.use('/', Transaction);
app.use('/', Manager);
app.use('/', History);
app.use('/', FAQ);
app.use('/', Loan);
app.use('/',card);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, (req, res) => {
  console.log("YOUR BACKEND HAS BEEN SUCCESFULLY STARTED");
});

//export { pool, bcrypt,jwt,secret ,transporter};
export default app;

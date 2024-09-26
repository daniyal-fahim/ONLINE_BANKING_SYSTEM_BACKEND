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
    user: "daniyal237fahim@gmail.com", // Your Gmail email (hardcoded)
    pass: "amwx bdap dynn lzzi", // Your Gmail password or App Password (hardcoded)
  },
});
 //Configuring the Postgres server as pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "BANKING WORLD",
  password: "FAST",
  port: 5432,
});
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/",userRouter);
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, (req, res) => {
  console.log("YOUR BACKEND HAS BEEN SUCCESFULLY STARTED");
});



export { pool, bcrypt,jwt,secret ,transporter};

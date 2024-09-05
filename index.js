import express from "express";
import bodyparser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;
import bcrypt from "bcryptjs";
import userRouter from "./src/routes/UserRoute.js"
import cors from 'cors';

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();
const port = 3000;

 //Configuring the Postgres server as pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "BANKING WORLD",
  password: "FAST",
  port: 5432,
});

app.use('/public', express.static('public'));
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/",userRouter);


app.listen(port, (req, res) => {
  console.log("YOUR BACKEND HAS BEEN SUCCESFULLY STARTED");
});



export { pool, bcrypt };

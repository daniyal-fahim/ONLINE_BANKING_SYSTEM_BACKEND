import express from "express"
import bodyparser from "body-parser"
import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app=express();
const port=3000;
app.use(bodyparser.urlencoded({extended:true}));

// PostgreSQL Pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'FAST',
  port: 5432,
});

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';


app.listen(port,(req,res)=>{
    console.log("YOUR BACKEND HAS BEEN SUCCESFULLY STARTED");
});

app.post("/usersubmit",(req,res)=>{
    console.log(req.body);
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
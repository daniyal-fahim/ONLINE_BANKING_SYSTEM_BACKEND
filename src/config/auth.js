import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Load from environment or fallback

export { bcrypt, jwt, secret };

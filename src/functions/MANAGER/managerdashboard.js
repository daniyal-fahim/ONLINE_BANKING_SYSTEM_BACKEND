import pool from "../../config/db.js";

export const dashdata=async (req,res)=>{
    const count =await pool.query('select count(user_id) from users');


    
}
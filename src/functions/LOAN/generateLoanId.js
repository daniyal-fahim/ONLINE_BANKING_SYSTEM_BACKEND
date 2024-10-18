import pool from "../../config/db.js";

const getIdNum = () => {
    let Id = "L-";
    for (let i = 0; i < 4; i++) {
      Id += Math.floor(Math.random() * 10).toString(); // Generate a digit from 0-9
    }
    return Id;
  };
  
  export const getloanid = async () => {
    let Id = getIdNum();
    const checkAcc = await pool.query(
      "SELECT * FROM LOANS WHERE loan_id = $1",
      [Id]
    );
  
    if (checkAcc.rows.length > 0) {
      return await getloanid(); // Recurse to generate a new ID
    } else {
      return Id;
    }
  };
  
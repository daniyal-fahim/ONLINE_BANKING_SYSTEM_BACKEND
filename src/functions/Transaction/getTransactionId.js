import pool from "../../config/db.js";

const getIdNum = () => {
    let Id = "TR-";
    for (let i = 0; i < 4; i++) {
      Id += Math.floor(Math.random() * 10).toString(); // Generate a digit from 0-9
    }
    return Id;
  };
  
 export const checkDuplicateId = async () => {
    let Id = getIdNum();
    const checkAcc = await pool.query(
      "SELECT * FROM INTER_BANK_TRANSACTIONS WHERE trans_id = $1",
      [Id]
    );
  
    if (checkAcc.rows.length > 0) {
      return await checkDuplicateId(); // Recurse to generate a new ID
    } else {
      return Id;
    }
  };
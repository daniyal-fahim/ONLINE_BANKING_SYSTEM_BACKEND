import { pool } from "../../../index.js";

//generate unique history_id
const getIdNum2 = () => {
  let Id = '';  // Use a meaningful variable name
  Id+='HS-'
  for (let i = 0; i < 4; i++) {
    Id +=Math.floor(Math.random() * 10).toString();  // Generate a digit from 0-9
  }
  return Id;  // Return the generated account number
}

export const checkDuplicateId2 = async () => {
  let Id = getIdNum2();  // Get a new account number
  const checkAcc = await pool.query(
    "SELECT * FROM history WHERE history_id = $1",
    [Id]
  );

  if (checkAcc.rows.length > 0 ) {
    console.log(Id);
    return await checkDuplicateId2();  
  } else {
    return Id;  
  }
}
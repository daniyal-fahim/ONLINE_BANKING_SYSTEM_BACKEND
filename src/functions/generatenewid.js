import { pool } from "../../index.js";

const getIdNum = () => {
  let Id = '';  // Use a meaningful variable name
  Id+='U-'
  for (let i = 0; i < 4; i++) {
    Id +=Math.floor(Math.random() * 10).toString();  // Generate a digit from 0-9
  }
  return Id;  // Return the generated account number
}

const checkDuplicateAcc = async () => {
  let Id = getIdNum();  // Get a new account number
  const checkAcc = await pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [Id]
  );
  const checkAcc2 = await pool.query(
    "SELECT * FROM administration WHERE admin_id = $1",
    [Id]
  );
  if (checkAcc.rows.length > 0 ||checkAcc2.rows.length > 0 ) {
    console.log(Id);
    return await checkDuplicateAcc();  
  } else {
    return Id;  
  }
}

export const generateid=async (req,res)=>{
    var accnum=await checkDuplicateAcc();
    console.log(accnum);
    res.json(accnum);
}
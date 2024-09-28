import { pool, bcrypt } from "../../../index.js";

const getAccNum = () => {
  let accountNumber = '';  // Use a meaningful variable name
  for (let i = 0; i < 13; i++) {
    accountNumber += Math.floor(Math.random() * 10);  // Generate a digit from 0-9
  }
  return accountNumber;  // Return the generated account number
}

const checkDuplicateAcc = async () => {
  let account_number = getAccNum();  // Get a new account number
  const checkAcc = await pool.query(
    "SELECT * FROM users WHERE account_number = $1",
    [account_number]
  );

  if (checkAcc.rows.length > 0) {
    console.log(account_number);
    return checkDuplicateAcc();  
  } else {
    return account_number;  
  }
}

export const registerManager = async (req, res) => {
  const {
    dob,
    fname,
    lname,
    cnic,
    nationality,
    info,
    gender,
    email,
    designation,
    password,
  } = req.body;
  //dob,fname,lname,cnic,nationality,info,gender,designation,email,password;

  try {


    // Check if the user already exists
    const ManagerExists = await pool.query(
      "SELECT * FROM administration WHERE email = $1",
      [email]
    );
    if (ManagerExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await pool.query(
      "INSERT INTO administration (dob,fname,lname,cnic,nationality,info,gender,designation,email,password) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [dob,fname,lname,cnic,nationality,info,gender,designation,email,hashedPassword]
    );

    res.status(200).json({ message: "Adminstration registered successfully" });
  } catch (err) {
    console.error(err.message);
    let msg="Server error "+err.message ;
    res.status(500).json({ message: msg  });
  }
};
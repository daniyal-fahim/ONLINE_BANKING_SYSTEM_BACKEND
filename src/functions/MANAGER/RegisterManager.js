import { pool, bcrypt } from "../../../index.js";

//generate unique admin_id
const getIdNum = () => {
  let Id = '';  // Use a meaningful variable name
  Id+='AD-'
  for (let i = 0; i < 4; i++) {
    Id +=Math.floor(Math.random() * 10).toString();  // Generate a digit from 0-9
  }
  return Id;  // Return the generated account number
}

const checkDuplicateId = async () => {
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
    return await checkDuplicateId();  
  } else {
    return Id;  
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


    const admin_id=await checkDuplicateId();

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
      "INSERT INTO administration (admin_id,dob,fname,lname,cnic,nationality,info,gender,designation,email,password) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [admin_id,dob,fname,lname,cnic,nationality,info,gender,designation,email,hashedPassword]
    );

    res.status(200).json({ message: "Adminstration registered successfully" });
  } catch (err) {
    console.error(err.message);
    let msg="Server error "+err.message ;
    res.status(500).json({ message: msg  });
  }
};

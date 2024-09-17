import { pool, } from "../../../index.js";

var Gemail = "DANI@GM";

const data = {};
export const billing = async (req, res) => {
  const { selectedBill, Id, Amount,Company, Username, Check, Month, Email, Address } =
    req.body;
  const selectedCompany = Company; // Set selectedCompany
  var newbal;
  // const Check=true;
  //const Gemail = Email; // Assuming Gemail is the same as Email from req.body

  try {
    // Check if the user has enough balance
    const temp = await pool.query(
      "SELECT balance FROM users WHERE email = $1",
      [Gemail]
    );

    if (temp.rows.length > 0) {
      const user = temp.rows[0];
      console.log(user.balance);
      newbal = user.balance;
      if (Number(user.balance) > Number(Amount)) 
        {
        // Insert into the bills table
        await pool.query(
          'INSERT INTO bills (selectedBill, selectedCompany, AccNum, Amount, Username, Month1, BillEmail, "Check", Address, Email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [
            selectedBill,
            selectedCompany,
            Id,
            Amount,
            Username,
            Month,
            Email,
            Check,
            Address,
            Gemail,
          ]
        );

        // Optionally update the user's balance by deducting the bill amount
        await pool.query(
          "UPDATE users SET balance = balance - $1 WHERE email = $2",
          [Amount, Gemail]
        );

        const temp = await pool.query(
          "SELECT balance FROM users WHERE email = $1",
          [Gemail]
        );

        if (temp.rows.length > 0) {
          const user = temp.rows[0];
          console.log(user.balance);
          newbal = user.balance;
        }
        res.status(200).json({
          message: "Bill added and balance updated successfully",
          newbal,
        });
      } else {
        res.status(400).json({ message: "Insufficient balance" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
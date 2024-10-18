import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";
import { getFaqId } from "./getfaqid.js";

export const AskQuestion = async (req, res) => {
  const { name, question, email } = req.body;

  // Get user ID and FAQ ID asynchronously
  const user_id = await getGId(); // Get user ID from session or token
  const faq_id = await getFaqId(); // Get the next FAQ ID
  
  console.log(faq_id);

  // Validate required fields
  if (!name || !email || !question) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Insert the question into the FAQS table with the user_id and an empty answer/admin initially
    await pool.query(
      'INSERT INTO FAQS (FAQ_ID, QUESTION, USER_ID, Name, Email, ADDFAQ) VALUES ($1, $2, $3, $4, $5, FALSE)',
      [faq_id, question, user_id, name, email]
    );

    // Successful insertion
    res.status(200).json({ message: 'Question submitted successfully. Wait for an admin to answer your question.' });
  } catch (err) {
    // Handle errors
    console.error(`Error inserting question: ${err.message}`);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

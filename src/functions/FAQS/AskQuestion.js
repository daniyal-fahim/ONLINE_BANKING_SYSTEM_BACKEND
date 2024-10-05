import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";
import { getFaqId } from "./getfaqid.js";

export const AskQuestion = async (req, res) => {
  const { question } = req.body;
  const user_id = getGId(); // Get user ID from session or token
const faq_id=await getFaqId();
console.log(faq_id);

  try {
    // Insert the question into the FAQS table with the user_id and an empty answer/admin initially
    await pool.query(
      'INSERT INTO FAQS (FAQ_ID, QUESTION, USER_ID, ADDFAQ) VALUES ($1, $2, $3, FALSE)',
      [faq_id,question, user_id]
    );

    // Successful insertion
    res.status(200).json({ message: 'Question submitted successfully. Wait for an admin to answer your question.' });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

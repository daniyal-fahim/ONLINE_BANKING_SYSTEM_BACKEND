import pool from "../../config/db.js";
import { getGId } from "../LOGIN/getUserId.js";

export const GiveAnswer = async (req, res) => {
  const { FAQ_ID, answer } = req.body;
  const user_id = getGId();

  // Check if admin is logged in by verifying if the user_id starts with 'AD'
  if (!user_id.startsWith('AD')) {
    return res.status(403).json({ message: 'Only an admin can provide an answer' });
  }

  try {
    // Update the FAQ entry by adding the answer and marking the FAQ as answered (ADDFAQ = TRUE)
    const data = await pool.query(
      'UPDATE FAQS SET ANSWER = $1, ADDFAQ = TRUE, ADMIN_ID = $2 WHERE FAQ_ID = $3',
      [answer, user_id, FAQ_ID]
    );

    // If no rows were affected, the FAQ_ID does not exist
    if (data.rowCount === 0) {
      return res.status(404).json({ message: 'FAQ not found or already answered' });
    }

    // Successfully updated the answer
    res.status(200).json({ message: 'Answer successfully added to the FAQ' });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

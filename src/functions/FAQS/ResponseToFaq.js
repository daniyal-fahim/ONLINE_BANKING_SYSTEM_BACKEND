import pool from "../../config/db.js";

export const showunresponsefaqs = async (req, res) => {
  try {
    // Query to fetch all FAQs where addfaq is true (i.e., answered FAQs)
    const data = await pool.query('SELECT * FROM FAQS WHERE ANSWER IS NULL');

    // Check if there are any FAQs available
    if (data.rows.length > 0) {
      res.status(200).json({ data: data.rows }); // Send the fetched FAQs in response
    } else {
      res.status(404).json({ message: 'No FAQs found' }); // No FAQs were found, send 404
    }
  } catch (err) {
    // Handle any potential database or query errors
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

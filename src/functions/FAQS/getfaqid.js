import { pool } from "../../../index.js";

// Function to generate a unique 4-digit ID with 'FAQ-' prefix
const generateUniqueFaqId = () => {
  let faqId = 'FAQ-'; // Prefix
  for (let i = 0; i < 4; i++) {
    faqId += Math.floor(Math.random() * 10).toString();  // Generate a random digit (0-9)
  }
  return faqId;
};

// Function to check the uniqueness of the generated FAQ_ID
export const getFaqId = async () => {
  let faqId = generateUniqueFaqId();  // Generate a new ID

  // Check if the generated ID already exists in the FAQS table
  const existingFaq = await pool.query(
    "SELECT * FROM FAQS WHERE faq_id = $1",
    [faqId]
  );

  // If the ID exists, recursively generate a new one
  if (existingFaq.rows.length > 0) {
    return await getFaqId();  
  } else {
    // Return the unique ID if not found in the database
    return faqId;  
  }
};

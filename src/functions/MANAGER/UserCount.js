import pool from "../../config/db.js";
export const getUserCount = async (req, res) => {
    try {
      // Query to count the number of users in the 'users' table
      const result = await pool.query('SELECT COUNT(*) AS user_count FROM users');
  
      // Extract the count from the result
      const userCount = result.rows[0].user_count;
  
      // Return the count in the response
      res.json({ userCount });
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Server error occurred while retrieving user count.' });
    }
  };


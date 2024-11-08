import pool from "../../config/db.js";
import { getGId } from "./getUserId.js";

export const getbankdailyusage = async (req, res) => {
    const userId = getGId();  // Assume this function returns the logged-in user ID
  
    // SQL query to get daily expenditures
    const query = `
      SELECT 
          DATE(PAID_AT) AS expenditure_date,
          SUM(AMOUNT) AS total_daily_expenditure
      FROM (
          -- Expenditure from BILLS
          SELECT 
              USER_ID,
              AMOUNT,
              PAID_AT
          FROM 
              BILLS
          WHERE 
              PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
      ) AS bills_expenditure
      GROUP BY 
          expenditure_date
  
      UNION ALL
  
      SELECT 
          DATE(PAID_AT) AS expenditure_date,
          SUM(AMOUNT) AS total_daily_expenditure
      FROM (
          -- Expenditure from INTER_BANK_TRANSACTIONS
          SELECT 
              SENDER_USER_ID AS USER_ID,
              AMOUNT,
              PAID_AT
          FROM 
              INTER_BANK_TRANSACTIONS
          WHERE 
              PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
      ) AS transactions_expenditure
      GROUP BY 
          expenditure_date
      ORDER BY 
          expenditure_date;
    `;
  
    try {
      // Execute the query
      pool.query(query, [userId], (err, result) => {
        if (err) {
          console.error('Error executing query', err.stack);
          res.status(500).json({ error: 'Error retrieving daily usage.' });
        } else {
          console.log('Daily expenditure:', result.rows);
          res.status(200).json({ dailyusage: result.rows });
        }
      });
    } catch (err) {
      console.error('Error in getUserDailyUsage:', err);
      res.status(500).json({ error: 'Server error occurred.' });
    }
};

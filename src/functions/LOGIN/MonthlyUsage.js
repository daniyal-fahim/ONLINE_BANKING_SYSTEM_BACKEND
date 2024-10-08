import { pool } from "../../../index.js";
import { getGId } from "./getUserId.js";
export const getusermonthusage = async (req, res) => {
  // Get the current date
  const currentDate = new Date();
  const yourMonth = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const yourYear = currentDate.getFullYear();   // Get the current year

  // Get the user ID
  const userId = getGId();  // Assume this function returns the logged-in user ID

  // SQL query with parameterized inputs
  const query = `
    SELECT 
        USER_ID, 
        SUM(monthly_expenditure) AS total_monthly_expenditure
    FROM (
        -- Expenditure from BILLS
        SELECT 
            USER_ID,
            SUM(AMOUNT) AS monthly_expenditure
        FROM 
            BILLS
        WHERE 
            USER_ID = $1
            AND EXTRACT(MONTH FROM PAID_AT) = $2
            AND EXTRACT(YEAR FROM PAID_AT) = $3
        GROUP BY 
            USER_ID

        UNION ALL

        -- Expenditure from INTER_BANK_TRANSACTIONS
        SELECT 
            SENDER_USER_ID AS USER_ID,
            SUM(AMOUNT) AS monthly_expenditure
        FROM 
            INTER_BANK_TRANSACTIONS
        WHERE 
            SENDER_USER_ID = $1
            AND EXTRACT(MONTH FROM PAID_AT) = $2
            AND EXTRACT(YEAR FROM PAID_AT) = $3
        GROUP BY 
            SENDER_USER_ID
    ) AS expenditure_summary
    GROUP BY USER_ID;
  `;

  try {
    // Execute the query
    pool.query(query, [userId, yourMonth, yourYear], (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Error retrieving monthly usage.' });
      } else {
        console.log('Monthly expenditure:', result.rows);
        res.status(200).json({ monthlyusage: result.rows });
      }
    });
  } catch (err) {
    console.error('Error in getusermonthusage:', err);
    res.status(500).json({ error: 'Server error occurred.' });
  }
};


export const getUserDailyUsage = async (req, res) => {
    // Get the user ID
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
              USER_ID = $1
              AND PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
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
              SENDER_USER_ID = $1
              AND PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
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
  
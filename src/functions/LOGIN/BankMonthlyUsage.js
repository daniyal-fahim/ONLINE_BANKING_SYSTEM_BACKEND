import pool from "../../config/db.js";

export const getbankdailyusage = async (req, res) => {
  
  const query = `
    SELECT 
        expenditure_date,
        SUM(total_daily_expenditure) AS total_daily_spending
    FROM (
        -- Daily expenditure from BILLS
        SELECT 
            DATE(PAID_AT) AS expenditure_date,
            SUM(AMOUNT) AS total_daily_expenditure
        FROM 
            BILLS
        WHERE 
            PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
        GROUP BY 
            DATE(PAID_AT)

        UNION ALL

        -- Daily expenditure from INTER_BANK_TRANSACTIONS
        SELECT 
            DATE(PAID_AT) AS expenditure_date,
            SUM(AMOUNT) AS total_daily_expenditure
        FROM 
            INTER_BANK_TRANSACTIONS
        WHERE 
            PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
        GROUP BY 
            DATE(PAID_AT)
    ) AS daily_expenditures
    GROUP BY 
        expenditure_date
    ORDER BY 
        expenditure_date;
  `;

  try {
    // Execute the query
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Error retrieving daily usage.' });
      } else {
        console.log('Daily expenditure:', result.rows);
        res.status(200).json({ dailyusage: result.rows });
      }
    });
  } catch (err) {
    console.error('Error in getbankdailyusage:', err);
    res.status(500).json({ error: 'Server error occurred.' });
  }
};

import pool from "../../config/db.js";

export const getbankcurrentmonthusage = async (req, res) => {
  
  const query = `
    SELECT 
        SUM(total_daily_expenditure) AS total_monthly_spending
    FROM (
        -- Expenditure from BILLS for current month
        SELECT 
            SUM(AMOUNT) AS total_daily_expenditure
        FROM 
            BILLS
        WHERE 
            PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
            AND PAID_AT < DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month') -- End of the current month
        GROUP BY 
            DATE(PAID_AT)

        UNION ALL

        -- Expenditure from INTER_BANK_TRANSACTIONS for current month
        SELECT 
            SUM(AMOUNT) AS total_daily_expenditure
        FROM 
            INTER_BANK_TRANSACTIONS
        WHERE 
            PAID_AT >= DATE_TRUNC('month', CURRENT_DATE) -- Start of the current month
            AND PAID_AT < DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month') -- End of the current month
        GROUP BY 
            DATE(PAID_AT)
    ) AS daily_expenditures;
  `;

  try {
    // Execute the query
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Error retrieving current month usage.' });
      } else {
        console.log('Current month expenditure:', result.rows);
        res.status(200).json({ currentMonthUsage: result.rows[0].total_monthly_spending });
      }
    });
  } catch (err) {
    console.error('Error in getbankcurrentmonthusage:', err);
    res.status(500).json({ error: 'Server error occurred.' });
  }
};

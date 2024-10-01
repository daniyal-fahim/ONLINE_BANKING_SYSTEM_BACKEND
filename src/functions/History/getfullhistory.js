import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";
///UNDER CONSTRUCTION

export const gethistory = async (req, res) => {
    const user_id = getGId(req); // Adjusted
    try {
        const data = await pool.query('select * from history where user_id = $1', [user_id]); // Added brackets around user_id
        var history = []; // Corrected initialization

        if (data.rows.length > 0) {
            var user1 = data.rows;

            user1.forEach(async (user1) => { // Corrected the iteration
                if (user1.bill_id != null) {
                    console.log(user1.bill_id);
                    const temp = user1.bill_id;
                    const data1 = await pool.query('select * from bills where user_id = $1', [temp]); // Added brackets
                    if (data1.rows.length > 0) {
                        history.push(...data1.rows); // Corrected concatenation
                    }
                }
                if (user1.trans_id != null) {
                    console.log(user1.trans_id);
                    const temp1 = user1.trans_id;
                    const data2 = await pool.query('select * from INTER_BANK_TRANSACTIONS where trans_id = $1', [temp1]); // Added brackets
                    if (data2.rows.length > 0) {
                        history.push(...data2.rows); // Corrected concatenation
                    }
                }
            });

            res.json({ data: history });
        } else {
            res.status(500).json({ message: "no user history found" });
        }
    } catch (err) {
        console.error(err); // Added error logging
        res.status(500).json({ message: "Internal server error" }); // Added error response
    }
}

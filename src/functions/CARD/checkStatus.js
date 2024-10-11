import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";

export const checkstatus = async (req, res) => {
        const id=getGId();
    try {
        const result = await pool.query(
            "SELECT * FROM CARD WHERE user_id = $1",
            [id]
        );

        if (result.rows.length > 0) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error checking card status.' });
    }
};

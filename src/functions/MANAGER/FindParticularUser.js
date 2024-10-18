import pool from "../../config/db.js";

export const FindUser = async (req, res) => {
    const { id } = req.body;
    
    try {
        let result;

        if (id[0] === 'U' || id[0] === 'u') {
            // Fetch user from users table
            const userQuery = await pool.query("SELECT * FROM users WHERE user_id=$1", [id]);
            result = userQuery.rows; // rows contain the result set
        } else if (id[0] === 'A' || id[0] === 'a') {
            // Fetch admin from administration table
            const adminQuery = await pool.query("SELECT * FROM administration WHERE admin_id=$1", [id]);
            result = adminQuery.rows;
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No user or admin found with the given ID" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching user or admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

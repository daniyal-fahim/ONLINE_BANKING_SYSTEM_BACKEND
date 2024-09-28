import {pool} from "../../../index.js";


export const getAllUnauthorized = async (req, res) => {
    try {
        const adminResult = await pool.query('SELECT * FROM administration WHERE approved = false');
        const userResult = await pool.query('SELECT * FROM users WHERE approved = false');

        let manager = [];
        let users = [];

        if (adminResult.rows.length > 0) {
            manager = adminResult.rows;
        }
        if (userResult.rows.length > 0) {
            users = userResult.rows;
        }

        // Combine both results
        const result = [...manager, ...users];

        res.json(result);
    } catch (error) {
        console.error('Error fetching unauthorized users and managers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


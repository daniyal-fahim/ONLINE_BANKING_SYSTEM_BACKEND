import { pool, bcrypt } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";

export const checkPin = async (req, res) => {
    const { pin } = req.body; // Get the PIN from the request body
    var user_id  = getGId(); // Assuming user_id is passed as a URL parameter

    try {
        // Query to get the hashed PIN for the given user
        const result = await pool.query(`SELECT PIN FROM CARD WHERE USER_ID = $1`, [user_id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Card not found for this user.' });
        }

        const hashedPin = result.rows[0].PIN;

        // Check if the provided PIN matches the hashed PIN
        const isMatch = await bcrypt.compare(pin, hashedPin);

        if (isMatch) {
            return res.status(200).json({ message: 'PIN is correct.' });
        } else {
            return res.status(401).json({ message: 'Incorrect PIN.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to check PIN.', err: error });
    }
};

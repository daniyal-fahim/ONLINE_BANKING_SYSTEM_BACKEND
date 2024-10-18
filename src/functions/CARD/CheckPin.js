import pool from "../../config/db.js";
import { bcrypt } from "../../config/auth.js";
import { getGId } from "../LOGIN/getUserId.js";

export const checkPin = async (req, res) => {
    const { pin } = req.body; // Get the PIN from the request body

    // Check if pin is provided
    if (!pin) {
        return res.status(400).json({ message: 'PIN is required.' });
    }

    const user_id = await getGId(); // Get user ID

    if (!user_id) {
        return res.status(400).json({ message: 'User ID could not be retrieved.' });
    }
    console.log(pin + ' ' + user_id);

    try {
        // Query to get the hashed PIN for the given user
        const result = await pool.query("SELECT * FROM CARD WHERE user_id = $1",
      [user_id]);
      console.log("Query result:", result);
        if (result.rows.length > 0) {
            const hashedPin = result.rows[0].pin;
            console.log(hashedPin);
            const isMatch = await bcrypt.compare(pin, hashedPin);

            if (isMatch) {
                return res.status(200).json({ message: 'PIN is correct.' });
            } else {
                return res.status(401).json({ message: 'Incorrect PIN.' });
            }
        }


        else {
            return res.status(404).json({ message: 'Card not found for this user.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to check PIN: ' + error.message });
    }
};

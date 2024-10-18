import pool from "../../config/db.js";
import { bcrypt } from "../../config/auth.js";
import { getGId } from "../LOGIN/getUserId.js"
import { getUniqueCardNum ,getCardid} from "./GenerateCard_Id-NUM.js";

// CREATE TABLE CARD{
//     CARD_ID INT PRIMARY KEY UNIQUE,
//     USER_ID VARCHAR(12) NOT NULL UNIQUE,
//     CARD_NUM VARCHAR(20) NOT NULL,
//     PHONE VARCHAR(30) NOT NULL,
//     PIN VARCHAR(100) NOT NULL,
//     CARD_NAME VARCHAR(30) NOT NULL,
//     CARD_TYPE VARCHAR(30) NOT NULL,
//     FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)
//   }
export const addCard = async (req, res) => {
    const { type, name, pin, phone } = req.body;
    const user_id = getGId(); 
    const card_id = await getCardid();
    const card_num = await getUniqueCardNum();
    const hashedPin = await bcrypt.hash(pin, 15);

    try {
    
        await pool.query(`INSERT INTO CARD (CARD_ID, USER_ID, CARD_NUM, PHONE, PIN, CARD_NAME, CARD_TYPE) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [card_id,user_id,card_num,phone,hashedPin,name,type]);

        return res.status(201).json({ message: 'Card added successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add card.',err:error });
    }
};

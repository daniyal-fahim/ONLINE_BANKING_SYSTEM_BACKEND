
import { pool } from "../../../index.js";
import { getGId } from "./getUserId.js";

export const getuserfname = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            console.log(user.fname);
            res.json(user.fname);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuserlname = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT lname FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json(user.lname);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuseremail = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT email FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json(user1.email);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getusercnic = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT cnic FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json(user1.cnic);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getusernationality = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT nationality FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json(user1.nationality);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuseraccountnumber = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT account_number FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json(user1.account_number);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getuserdob = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT dob FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json(user1.dob);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getuserjoindate = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT joined FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json(user.joined);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuserupdatetime = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT updated FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json(user.updated);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuserinfo = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT info FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json(user.info);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuserapproval = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT approved FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json(user.approved);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getuserid = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    res.json(user_id);
   
};

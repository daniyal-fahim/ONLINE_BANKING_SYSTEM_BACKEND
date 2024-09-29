import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";

export const getadminfname = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.fname);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadminlname = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.lname);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadminemail = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.email);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadmincnic = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.cnic);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getadminnationality = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.nationality);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadmindesignation = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.designation);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getadmindob = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.dob);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getadminjoindate = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.joined);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadminupdatetime = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.updated);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadmininfo = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.info);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getadminapproval = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM admins WHERE admin_id = $1', [admin_id]);

        if (temp.rows.length > 0) {
            const admin = temp.rows[0];
            res.json(admin.approved);
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getadminid = async (req, res) => {
    const admin_id = getGId();
    if (!admin_id) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    res.json(admin_id);
   
};

import express from "express";

const router = express.Router();

import { registerManager } from "../functions/MANAGER/RegisterManager.js";
import { loginManager } from "../functions/MANAGER/LoginManager.js";
import { login } from "../functions/LOGIN/LoginUser.js";
import { register } from "../functions/LOGIN/RegisterUser.js";

router.post("/login", login);
router.post("/register", register);

router.post("/registermanager", registerManager);
router.post("/loginmanager", loginManager);

export default router;

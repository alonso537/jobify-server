import express from "express";
const router = express.Router();

import { login, register, updateUser } from "../controllers/authController.js";
import auth from "../middleware/authenticateuser.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(auth, updateUser);

export default router;

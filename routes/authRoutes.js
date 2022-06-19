import express from "express";
const router = express.Router();
// import limiter from "express-rate-limit";

// const limiterOptions = {
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again in 15 minutes",
// };

import { login, register, updateUser } from "../controllers/authController.js";
import auth from "../middleware/authenticateuser.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(auth, updateUser);

export default router;

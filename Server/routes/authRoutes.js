import express from "express";
import {
  login,
  register,
  resetPassword,
  sendOtp,
  verifyOTP,
} from "../controllers/userAuthController.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
export default router;

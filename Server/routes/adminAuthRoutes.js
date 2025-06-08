import express from "express";
import {
  getAllNewsByReporter,
  login,
} from "../controllers/adminAuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.post("/login", login);
router.get("/api/news/:id", verifyToken, getAllNewsByReporter);
export default router;

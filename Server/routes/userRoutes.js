import express from "express";
import { getUserInfo, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:email", verifyToken, getUserInfo);
router.put("/:email", verifyToken, updateUser);

export default router;

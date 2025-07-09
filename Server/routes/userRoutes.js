import express from "express";
import { getUserInfo, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:email", getUserInfo);
router.post("/:email", updateUser);

export default router;

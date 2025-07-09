import express from "express";
import { getUserInfo, updateUser } from "../controllers/userController";

const router = express.Router();

router.get("/:email", getUserInfo);
router.post("/:email", updateUser);

export default router;

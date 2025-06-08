import express from "express";
import {
  getAllNews,
  getNewsById,
  getNewsByCategory,
  postNews,
} from "../controllers/newsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.get("/category/:category", getNewsByCategory);
router.post("/", verifyToken, postNews);

export default router;

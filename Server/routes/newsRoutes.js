import express from "express";
import {
  getAllNews,
  getNewsById,
  getNewsByCategory,
} from "../controllers/newsController.js";
const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.get("/category/:category", getNewsByCategory);

export default router;

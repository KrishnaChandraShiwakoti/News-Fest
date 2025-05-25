import express from "express";
import {
  getAllNews,
  getNewsByCategory,
  getNewsById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.get("/category/:category", getNewsByCategory);

export default router;

import express from "express";
import {
  getAllNews,
  getNewsById,
  getNewsByCategory,
  postNews,
  deletePost,
  editPost,
} from "../controllers/newsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

import multer from "multer";

import storage from "../middleware/multerStorage.js";
const upload = multer({ storage });

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.get("/category/:category", getNewsByCategory);
router.post("/", verifyToken, upload.single("image"), postNews);
router.delete("/:id", verifyToken, deletePost);
router.put("/edit/:id", verifyToken, upload.single("image"), editPost);

export default router;

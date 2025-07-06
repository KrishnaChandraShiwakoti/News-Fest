import express from "express";
import {
  addToBookmark,
  deleteBookmark,
  getBookmarks,
} from "../controllers/bookmarkController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/", verifyToken, addToBookmark);
router.delete("/:bookmarkId", verifyToken, deleteBookmark);
router.get("/:userId", verifyToken, getBookmarks);

export default router;

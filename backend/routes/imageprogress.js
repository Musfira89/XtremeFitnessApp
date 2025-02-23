import express from "express";
import multer from "multer";
import { uploadProgressImage, getAllProgressImages } from "../controllers/Imageprogress.js";

const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage ,   limits: { fileSize: 50 * 1024 * 1024 }, });

// Routes
router.post("/upload", upload.single("image"), uploadProgressImage); // Upload or update an image
router.get("/:userId", getAllProgressImages);

export default router;

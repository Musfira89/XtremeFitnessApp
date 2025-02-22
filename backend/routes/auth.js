import express from "express";
import { registerUser, loginUser , markQuestionnaireComplete,getAllUsers,getTotalUsers, getUserPlan,deleteUser ,getUserProfile, updateUserProfile} from "../controllers/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/mark-complete/:userId", markQuestionnaireComplete);
router.get("/users", getAllUsers);
router.get("/total-users", getTotalUsers);
router.get("/:userId/plan", getUserPlan);
router.delete("/users/:userId", deleteUser);

router.get("/profile/:userId", getUserProfile);
router.put("/update/:userId", upload.single("profileImage"), updateUserProfile);

export default router;

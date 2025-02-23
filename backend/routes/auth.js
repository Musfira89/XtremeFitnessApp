import express from "express";
import { registerUser, loginUser , markQuestionnaireComplete,getAllUsers,getTotalUsers, getUserPlan,deleteUser ,getUserProfile, updateUserProfile} from "../controllers/auth.js";
import multer from "multer";


const router = express.Router();

// Set up storage engine

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
const upload = multer({ storage ,   limits: { fileSize: 50 * 1024 * 1024 } });
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

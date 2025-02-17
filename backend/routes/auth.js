import express from "express";
import { registerUser, loginUser , markQuestionnaireComplete,getAllUsers,getTotalUsers, getUserPlan,deleteUser ,getUserProfile, updateUserProfile} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/mark-complete/:userId", markQuestionnaireComplete);
router.get("/users", getAllUsers);
router.get("/total-users", getTotalUsers);
router.get("/:userId/plan", getUserPlan);
router.delete("/users/:userId", deleteUser);

router.get("/profile/:userId", getUserProfile);
router.put("/update/:userId", updateUserProfile);

export default router;

import express from "express";
import { registerUser, loginUser , markQuestionnaireComplete,getAllUsers,getTotalUsers, getUserPlan} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/mark-complete/:userId", markQuestionnaireComplete);
router.get("/users", getAllUsers);
router.get("/total-users", getTotalUsers);
router.get("/:userId/plan", getUserPlan);


export default router;

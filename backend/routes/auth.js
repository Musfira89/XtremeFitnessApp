import express from "express";
import { registerUser, loginUser , markQuestionnaireComplete, deleteUser ,getAnalytics} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/mark-complete/:userId", markQuestionnaireComplete);



router.delete("/user/:id", deleteUser);
router.get("/analytics", getAnalytics);

export default router;

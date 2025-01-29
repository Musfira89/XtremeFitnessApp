import express from "express";
import { registerUser, loginUser , deleteUser ,getAnalytics} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.delete("/user/:id", deleteUser);
router.get("/analytics", getAnalytics);

export default router;

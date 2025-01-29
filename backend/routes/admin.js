import express from "express";
import { adminLogin ,getAllUsers } from "../controllers/admin.js";
import { getAnalytics } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getAllUsers);
router.get("/analytics", getAnalytics);

export default router;

import express from "express";
import {adminSignup, adminLogin , updateAdminProfile,getAdminProfile} from "../controllers/admin.js";
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Store uploaded images

router.post("/login", adminLogin);
router.post('/signup', adminSignup);
router.put('/update/:adminId', upload.single('profileImage'), updateAdminProfile);
router.get("/:adminId", getAdminProfile); // Fetch admin profile


export default router;

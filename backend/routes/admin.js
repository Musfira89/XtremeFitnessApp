import express from "express";
import {adminSignup, adminLogin , updateAdminProfile,getAdminProfile} from "../controllers/admin.js";
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });
  const upload = multer({ storage , limits: { fileSize: 5 * 1024 * 1024 } });
  


router.post("/login", adminLogin);
router.post('/signup', adminSignup);
router.put('/update/:adminId', upload.single('profileImage'), updateAdminProfile);
router.get("/:adminId", getAdminProfile); // Fetch admin profile


export default router;

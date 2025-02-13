import bcrypt from 'bcryptjs'; 
import { StatusCodes } from 'http-status-codes';
import Admin from '../models/admin.js';


export const adminSignup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(StatusCodes.CREATED).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating admin' });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });
    }

    res.status(StatusCodes.OK).json({
      message: 'Login successful',
      admin: { id: admin._id, email: admin.email, fullName: admin.fullName },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error logging in' });
  }
};

export const updateAdminProfile = async (req, res) => {
  const { adminId } = req.params;
  const { fullName, email, password, contact, experience, specialization, certifications, location } = req.body;
  let profileImage = req.file ? req.file.path : null; // If an image is uploaded

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Admin not found" });
    }

    // Update fields if provided
    if (fullName) admin.fullName = fullName;
    if (email) admin.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }
    if (profileImage) admin.profileImage = profileImage;
    if (contact) admin.contact = contact;
    if (experience) admin.experience = experience;
    if (specialization) admin.specialization = specialization;
    if (certifications) admin.certifications = certifications;
    if (location) admin.location = location;

    await admin.save();
    res.status(StatusCodes.OK).json({ message: "Profile updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating profile" });
  }
};

export const getAdminProfile = async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};




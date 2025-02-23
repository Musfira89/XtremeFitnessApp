import React, { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import axios from "axios";
import { Box, Typography, Grid, Paper, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoachSettings = () => {
  const { adminAuth } = useAdminAuth();
  const [coachData, setCoachData] = useState({
    fullName: "",
    email: "",
    role: "Coach",
    contact: "",
    experience: "",
    specialization: "",
    certifications: "",
    location: "",
    password: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setCoachData({ ...coachData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCoachData({ ...coachData, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminAuth.adminId) return;
  
    // Check if profile image exceeds 2MB limit
    if (coachData.profileImage && coachData.profileImage.size > 50 * 1024 * 1024) {
      toast.error("Image size exceeds 50MB. Please upload a smaller image.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { background: "black", color: "white" }, // Black background
      });
      return;
    }
  
    try {
      const formData = new FormData();
      Object.keys(coachData).forEach((key) => {
        if (coachData[key]) formData.append(key, coachData[key]);
      });
  
      console.log("FormData:", [...formData]); // Debugging
  
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/update/${adminAuth.adminId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { background: "black", color: "white" }, // Black background
      });
    } catch (error) {
      console.error("Error updating profile:", error);
  
      const errorMessage = error.response?.status === 413
        ? "Image size too large. Try a smaller image."
        : "Failed to update profile.";
  
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { background: "black", color: "white" }, // Black background
      });
    }
  };
  
  return (
    <Box sx={{ p: 3, maxWidth: 1100, margin: "0 auto", backgroundColor: "#fff" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold", color: "#991b1b" }}>
        Coach Settings
      </Typography>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{ width: 200, height: 200, margin: "auto", backgroundColor: "lightgray", borderRadius: "100px", overflow: "hidden" }}
        >
          {previewImage ? (
            <img src={previewImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Typography variant="body2" color="textSecondary"></Typography>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="upload-btn" />
          <label htmlFor="upload-btn">
            <Button component="span" variant="contained" sx={{ mr: 2, background: "#991b1b", color: "#fff" }}>Upload Image</Button>
          </label>

        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid lightgrey", backgroundColor: "#fff" }}>
              <Typography variant="h6" gutterBottom>Edit Profile Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Full Name" name="fullName" value={coachData.fullName} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" name="email" value={coachData.email} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="" value={coachData.role} fullWidth disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Contact" name="contact" value={coachData.contact} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Experience" name="experience" value={coachData.experience} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Specialization" name="specialization" value={coachData.specialization} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Certifications" name="certifications" value={coachData.certifications} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Location" name="certifications" value={coachData.location} fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={{ mt: 2, background: "#991b1b", color: "#fff" }}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CoachSettings;

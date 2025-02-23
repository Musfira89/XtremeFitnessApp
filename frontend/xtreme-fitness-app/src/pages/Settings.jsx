import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    location: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/profile/${userId}`
        );
        const user = response.data;

        setFormData({
          fullName: user.fullName || "",
          email: user.email || "",
          contact: user.contact || "",
          location: user.location || "",
          password: "",
        });

        if (user.profileImage) {
          setPreview(`${import.meta.env.VITE_API_BASE_URL}${user.profileImage}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file size exceeds 50MB
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Image size exceeds 50MB. Please upload a smaller image.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { background: "black", color: "white" },
        });
        return;
      }

      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (profileImage) {
      formDataToSend.append("profileImage", profileImage);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/update/${userId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { background: "black", color: "white" },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage =
        error.response?.status === 413
          ? "Image size too large. Try a smaller image."
          : "Failed to update profile.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { background: "black", color: "white" },
      });
    }
  };

  return (
    <Box
      sx={{ p: 3, maxWidth: 1100, margin: "0 auto", backgroundColor: "#fff" }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#991b1b",
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Left Section - Profile Upload (40%) */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              border: "1px solid lightgrey",
            }}
          >
            <Avatar
              src={preview}
              sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 1, background: "#991b1b", color: "#fff" }}
              component="label"
            >
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Paper>
        </Grid>

        {/* Right Section - Editable Fields (60%) */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 2, border: "1px solid lightgrey" }}
          >
            <Typography variant="h6" gutterBottom>
              Update Profile
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              Edit your information below
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Leave blank to keep current password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ background: "#991b1b", color: "#fff", width: "100%" }}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;

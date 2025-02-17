import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Settings = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    location: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/profile/${userId}`
        );
        const user = response.data;

        setFormData({
          fullName: user.fullName || "",
          email: user.email || "",
          contact: user.contact || "",
          location: user.location || "",
          password: "", // Leave blank initially
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/auth/update/${userId}`,
        formData
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
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

      {/* Right Section - Editable Fields */}
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
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
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
    </Box>
  );
};

export default Settings;

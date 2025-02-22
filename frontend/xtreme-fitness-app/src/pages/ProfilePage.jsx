import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, TextField, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams(); // Fetch userId from route parameters

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/profile/${userId}`
        );

        // Extract necessary data properly
        const user = response.data;
        const formattedUser = {
          fullName: user.fullName || "N/A",
          email: user.email || "N/A",
          contact: user.contact || "N/A",
          location: user.location || "Not provided",
          plan: user.plan ? user.plan.name : "No Plan",
          subscriptionStatus: user.subscriptionStatus || "Inactive",
          hasCompletedQuestionnaire: user.hasCompletedQuestionnaire
            ? "Yes"
            : "No",
          profileImage: user.profileImage || "", // Ensure profile image is fetched
        };

        setUserData(formattedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.log("Profile Image URL:", userData.profileImage);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) return <Typography>Loading...</Typography>;

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
        User Profile
      </Typography>
      <Paper
        elevation={0}
        sx={{ p: 3, borderRadius: 2, border: "1px solid lightgrey" }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`http://localhost:5000${userData.profileImage}`}
              alt={userData.fullName}
              sx={{
                width: 220, // Increased size
                height: 220, // Keep height and width equal for a perfect circle
                borderRadius: "50%", // Ensures a circular shape
                border: "3px solid #991b1b", // Thicker border for better visibility
              }}
              imgProps={{
                style: {
                  objectFit: "contain", // Ensures the full image is visible without cropping
                },
              }}
            />
          </Grid>

          {/* Right Side: Profile Details (60%) */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Profile Details
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              User information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  value={userData.fullName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={userData.email}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact"
                  value={userData.contact}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  value={userData.location}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Plan Name"
                  value={userData.plan}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Subscription Status"
                  value={userData.subscriptionStatus}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Completed Questionnaire"
                  value={userData.hasCompletedQuestionnaire}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserProfile;

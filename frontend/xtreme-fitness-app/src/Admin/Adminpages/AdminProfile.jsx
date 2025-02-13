import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Grid, Paper, Divider, Button, TextField } from "@mui/material";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import defaultProfileImage from "../../assets/progress.jpg"; // Default image if no profile exists
import { Link } from "react-router-dom";

const CoachProfile = () => {
  const { adminAuth } = useAdminAuth();
  const [coachData, setCoachData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/${adminAuth.adminId}`);
        setCoachData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    if (adminAuth.adminId) {
      fetchAdminData(); 
    }
  }, [adminAuth.adminId]);

  if (!coachData) {
    return <Typography sx={{ textAlign: "center", mt: 4 }}>Loading coach profile...</Typography>;
  }

  // Construct profile image URL
  const profileImageUrl = coachData.profileImage
    ? `http://localhost:5000/${coachData.profileImage.replace(/\\/g, "/")}` // Convert backslashes to forward slashes
    : defaultProfileImage;

  return (
    <Box sx={{ p: 3, maxWidth: 1100, margin: "0 auto", backgroundColor: "#fff" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold", color: "#991b1b" }}>
        Coach Profile
      </Typography>
      <Grid container spacing={2}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 3, border: "1px solid lightgrey", backgroundColor: "#fff" }}>
            <Avatar sx={{ width: 150, height: 150, margin: "auto", bgcolor: "grey" }} src={profileImageUrl} alt="Coach Profile" />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>{coachData.fullName}</Typography>
            <Typography color="textSecondary">{coachData.role}</Typography>
            <Divider sx={{ my: 2, borderColor: "lightgrey" }} />
            <Button
             component={Link} to="/admin/settings" 
              variant="contained"
              sx={{
                mt: 2,
                background: "#991b1b",
                color: "#fff",
                "&:hover": { background: "#7f1d1d" },
              }}
            >
              Update Profile
            </Button>
          </Paper>
        </Grid>

        {/* Coach Information Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid lightgrey", backgroundColor: "#fff" }}>
            <Typography variant="h6" gutterBottom>Profile Details</Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>Below are the details of the coach.</Typography>
            <Grid container spacing={2}>
              {[ 
                { label: "Full Name", value: coachData.fullName },
                { label: "Email", value: coachData.email },
                { label: "Role", value: coachData.role },
                { label: "Contact", value: coachData.contact },
                { label: "Experience", value: coachData.experience },
                { label: "Specialization", value: coachData.specialization },
                { label: "Certifications", value: coachData.certifications },
                { label: "Location", value: coachData.location },
              ].map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField label={field.label} value={field.value || "N/A"} fullWidth disabled />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoachProfile;

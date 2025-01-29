import React, { useState } from "react";
import { Box, Typography, Avatar, Grid, Paper, Divider, Button, TextField } from "@mui/material";
import profileImage from "../../assets/Xavier.jpg"; // Importing image from assets

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    fullName: "Xavier",
    email: "xavier@example.com",
    role: "Admin",
    contact: "+1 234 567 890",
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1100, margin: "0 auto", backgroundColor: "#fff" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold", color: "#991b1b" }} // Dark red for the title
      >
        Admin Profile
      </Typography>
      <Grid container spacing={2}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid lightgrey",
              backgroundColor: "#fff",
            }}
          >
            <Avatar
              sx={{ width: 150, height: 150, margin: "auto", bgcolor: "grey" }}
              src={profileImage} // Using imported image
              alt="Admin Profile"
            />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              {adminData.fullName}
            </Typography>
            <Typography color="textSecondary">{adminData.role}</Typography>
            <Divider sx={{ my: 2, borderColor: "lightgrey" }} />
            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: "#991b1b", // Dark red
                color: "#fff",
                "&:hover": {
                  background: "#7f1d1d", // Slightly darker red on hover
                },
              }}
            >
              Change Picture
            </Button>
          </Paper>
        </Grid>

        {/* Admin Information Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid lightgrey",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Profile Details
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              You can edit the information below
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  value={adminData.fullName}
                  fullWidth
                  onChange={(e) =>
                    setAdminData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={adminData.email}
                  fullWidth
                  onChange={(e) =>
                    setAdminData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Role"
                  value={adminData.role}
                  fullWidth
                  onChange={(e) =>
                    setAdminData((prev) => ({ ...prev, role: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact"
                  value={adminData.contact}
                  fullWidth
                  onChange={(e) =>
                    setAdminData((prev) => ({ ...prev, contact: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminProfile;

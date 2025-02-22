import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Badge,
  IconButton,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { MessageCircle, X } from "lucide-react";
import moment from "moment";
import { useAdminAuth } from "../context/AdminAuthContext"; // Ensure correct import
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

const AdminNoti = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { adminAuth } = useAdminAuth();
  const adminId = adminAuth.adminId;

  console.log("Admin Auth:", adminAuth);
  console.log("Admin ID:", adminId);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/messages/${adminId}`);
      const messages = response.data.data || [];
  
      const messageNotifications = messages
        .filter(msg => msg.receiver?._id === adminId) // Ensure receiver exists
        .map(msg => ({
          id: `message-${msg._id}`,
          senderName: msg.sender?.fullName || "Unknown", // Fallback to prevent errors
          message: `${msg.sender?.fullName || "Someone"} sent you a message.`,
          timeAgo: moment(msg.createdAt).fromNow(),
          icon: <MessageCircle className="text-gray-700" size={20} />,
          timestamp: new Date(msg.createdAt).getTime(),
        }));
  
      setNotifications(messageNotifications);
    } catch (error) {
      console.error("Error fetching admin notifications:", error);
    }
  };
  

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit">
        <Badge badgeContent={notifications.length} color="error">
          <FaBell size={24} />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: {
            width: "400px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div
          className="flex justify-between items-center p-6"
          style={{
            background: "linear-gradient(90deg, #8B0000, #B22222)",
            color: "white",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Admin Notifications
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            style={{ color: "white" }}
          >
            <X size={20} />
          </IconButton>
        </div>

        <List style={{ maxHeight: "300px", overflowY: "auto", padding: "2px" }}>
          {notifications.length === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              style={{ padding: "18px" }}
            >
              No new messages
            </Typography>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem>
                  <ListItemIcon>{notification.icon}</ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.timeAgo}
                  />
                </ListItem>
                {index !== notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Popover>
    </div>
  );
};

export default AdminNoti;

import React, { useState, useEffect, useRef } from "react";
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
  Button,
} from "@mui/material";
import { Bell, Video, MessageCircle, Utensils, X, Trash2 } from "lucide-react"; // Added Trash2 icon
import moment from "moment";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaBell, FaUserPlus } from "react-icons/fa";

const AdminNoti = () => {
  const [userData, setUserData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { adminAuth } = useAdminAuth();
  const adminId = adminAuth?.adminId;
  const prevUserList = useRef([]);

  useEffect(() => {
    if (adminId) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 5000);
      return () => clearInterval(interval);
    }
  }, [adminId]);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Users for Signup Notifications
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/users`
      );
      const newUsers = response.data;

      if (prevUserList.current.length > 0) {
        const newSignups = newUsers.filter(
          (newUser) =>
            !prevUserList.current.some((oldUser) => oldUser._id === newUser._id)
        );

        if (newSignups.length > 0) {
          const signupNotifications = newSignups.map((user) => ({
            id: `signup-${user._id}`,
            senderName: user.fullName,
            message: `${user.fullName} has signed up.`,
            timeAgo: moment(user.createdAt).fromNow(),
            icon: <FaUserPlus className="text-green-600" size={20} />,
            timestamp: new Date(user.createdAt).getTime(),
          }));

          updateNotifications(signupNotifications);
        }
      }

      prevUserList.current = newUsers;
      setUserData(newUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Messages for Admin
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/${adminId}?forAdmin=true`
      );
      const messages = response.data.data || [];

      const clearedNoti = JSON.parse(localStorage.getItem("clearedNoti")) || [];

      const newNotifications = messages
        .filter((msg) => !clearedNoti.includes(msg._id)) // Avoid duplicate cleared notifications
        .map((msg) => ({
          id: `message-${msg._id}`,
          senderName: msg.sender?.fullName || "Unknown",
          message: `${msg.sender?.fullName || "Someone"} sent you a message.`,
          timeAgo: moment(msg.createdAt).fromNow(),
          icon: <MessageCircle className="text-gray-700" size={20} />,
          timestamp: new Date(msg.createdAt).getTime(),
        }));

      updateNotifications(newNotifications);
    } catch (error) {
      console.error("Error fetching admin notifications:", error);
    }
  };

  // Update Notifications and Avoid Duplicates
  const updateNotifications = (newNoti) => {
    setNotifications((prev) => {
      const existingIds = new Set(prev.map((noti) => noti.id));
      const filteredNoti = newNoti.filter((noti) => !existingIds.has(noti.id));
      return [...filteredNoti, ...prev];
    });
  };

  // Handle Notifications Popover
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Clear Notifications and Store in LocalStorage
  const handleClearNotifications = () => {
    const clearedIds = notifications.map((noti) => noti.id.replace("message-", ""));
    localStorage.setItem("clearedNoti", JSON.stringify(clearedIds));
    setNotifications([]); // Clear all notifications
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
          <Typography variant="h8" fontWeight="bold">
            Admin Notifications
          </Typography>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <Button
                size="small"
                startIcon={<Trash2 size={16} />}
                onClick={handleClearNotifications}
                style={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                Clear All
              </Button>
            )}

            <IconButton
              onClick={handleClose}
              size="small"
              style={{ color: "white" }}
            >
              <X size={20} />
            </IconButton>
          </div>
        </div>

        <List style={{ maxHeight: "300px", overflowY: "auto", padding: "2px" }}>
          {notifications.length === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              style={{ padding: "18px" }}
            >
              No new notifications
            </Typography>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem>
                  <ListItemIcon>{notification.icon}</ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={moment(notification.timestamp).format(
                      "MMM D, h:mm A"
                    )}
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

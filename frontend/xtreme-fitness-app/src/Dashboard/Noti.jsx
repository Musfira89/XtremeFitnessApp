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
  Button, // Added Button
} from "@mui/material";
import { Bell, Video, MessageCircle, Utensils, X, Trash2 } from "lucide-react"; // Added Trash2 icon
import { useParams } from "react-router-dom";
import moment from "moment";
import { getTodayMeal, sendDailyReminder } from "./NotiService";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const clearedNotifications = localStorage.getItem("clearedNotifications");
    if (!clearedNotifications) {
      fetchNotifications();
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      let allNotifications = [];

      // Fetch Meetings
      const meetingResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/meeting/user/${userId}`
      );
      const meetingNotifications = meetingResponse.data.map((meeting) => ({
        id: `meeting-${meeting.id}`,
        message: "Admin scheduled a meeting with you",
        time: moment(meeting.created_at).format("dddd, D MMMM YYYY, h:mm A"),
        icon: <Video className="text-gray-700" size={20} />,
        timestamp: new Date(meeting.created_at).getTime(),
      }));
      allNotifications.push(...meetingNotifications);

      // Fetch Messages
      const messageResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/${userId}`
      );
      const messageNotifications = messageResponse.data.data.map((message) => ({
        id: `message-${message.id}`,
        message: "Admin sent you a new message.",
        time: moment(message.created_at).format("dddd, D MMMM YYYY, h:mm A"),
        icon: <MessageCircle className="text-gray-700" size={20} />,
        timestamp: new Date(message.created_at).getTime(),
      }));
      allNotifications.push(...messageNotifications);

      // Fetch Meal Plan
      const mealPlanResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/response/${userId}`
      );
      if (mealPlanResponse.data?.meals) {
        const todayMeal = getTodayMeal(mealPlanResponse.data.meals);
        if (todayMeal) {
          const mealNotification = {
            id: `meal-${userId}`,
            message: `Today's Meal Plan: ${Object.keys(todayMeal).join(", ")}`,
            time: moment().format("dddd, D MMMM YYYY, h:mm A"),
            icon: <Utensils className="text-gray-700" size={20} />,
            timestamp: new Date().setHours(8, 0, 0, 0),
          };
          allNotifications.push(mealNotification);
          sendDailyReminder(todayMeal);
        }
      }

      // Sort all notifications by timestamp (latest first)
      allNotifications.sort((a, b) => b.timestamp - a.timestamp);

      setNotifications(allNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    localStorage.setItem("clearedNotifications", "true");
  };

  return (
    <div>
      {/* Notification Icon */}
      <IconButton onClick={handleOpen} color="inherit">
        <Badge badgeContent={notifications.length} color="error">
          <Bell size={24} />
        </Badge>
      </IconButton>

      {/* Notifications Popover */}
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
        {/* Header with Clear Button */}
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
            Notifications
          </Typography>
          <div>
            {notifications.length > 0 && (
              <Button
                size="small"
                startIcon={<Trash2 size={16} />}
                onClick={handleClearNotifications}
                style={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: "4px 8px",
                  marginRight: "8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                Clear All
              </Button>
            )}
            <IconButton onClick={handleClose} size="small" style={{ color: "white" }}>
              <X size={20} />
            </IconButton>
          </div>
        </div>

        {/* Notifications List */}
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
                    secondary={notification.time}
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

export default NotificationsDropdown;
import React, { useState, useEffect } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./Message";

const AdminZoomMeetings = () => {
  const [meetingLink, setMeetingLink] = useState(localStorage.getItem("meetingLink") || null);
  const [meetingHistory, setMeetingHistory] = useState(
    JSON.parse(localStorage.getItem("meetingHistory")) || []
  );
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    fetchUsers();
    checkMeetingExpiration();
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/users`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Check if stored meeting link is expired
  const checkMeetingExpiration = () => {
    const storedTimestamp = localStorage.getItem("meetingTimestamp");
    if (storedTimestamp) {
      const elapsedTime = Date.now() - parseInt(storedTimestamp, 10);
      if (elapsedTime > 1800000) {
        // 30 minutes passed, remove expired meeting link
        localStorage.removeItem("meetingLink");
        localStorage.removeItem("meetingTimestamp");
        setMeetingLink(null);
      }
    }
  };

  // Start Meeting
  const handleStartMeeting = async () => {
    if (!selectedUser) {
      toast.error("Please select a user before starting a meeting.");
      return;
    }

    if (!topic.trim()) {
      toast.error("Please enter a topic for the meeting.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/meeting/create`,
        {
          userId: selectedUser,
          topic,
          duration: 30, // 30 minutes
        }
      );

      setMeetingLink(data.link);
      localStorage.setItem("meetingLink", data.link);
      localStorage.setItem("meetingTimestamp", Date.now().toString());

      const user = userData.find((u) => u._id === selectedUser);
      const userEmail = user ? user.email : "Unknown User";

      toast.success(`Meeting link sent to ${userEmail}`);

      // Store meeting in history
      const newMeeting = {
        name: topic,
        date: new Date().toLocaleDateString(),
        day: new Date().toLocaleString("en-us", { weekday: "long" }),
        user: selectedUser,
      };
      const updatedHistory = [...meetingHistory, newMeeting];
      setMeetingHistory(updatedHistory);
      localStorage.setItem("meetingHistory", JSON.stringify(updatedHistory));

      setTopic(""); // Clear topic input
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  // Clear Meeting History
  const handleClearHistory = () => {
    setMeetingHistory([]);
    localStorage.removeItem("meetingHistory");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Meeting Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-red-700 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Start a New Meeting
          </h3>

          {/* Select User Dropdown */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Select a User:
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select User --</option>
            {userData.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName}
              </option>
            ))}
          </select>

          {/* Topic Input */}
          {selectedUser && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Topic:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter meeting topic"
              />
            </div>
          )}

          {/* Start Meeting Button */}
          <button
            onClick={handleStartMeeting}
            className="mt-4 w-full bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md"
          >
            Start Meeting
          </button>

          {/* Meeting Link */}
          {meetingLink && (
            <div className="mt-4">
              <p className="text-gray-700 mb-2">
                Meeting Link (expires in 30 minutes):
              </p>
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-bold underline"
              >
                {meetingLink}
              </a>
            </div>
          )}
        </div>

        {/* Meeting History Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-red-700">Meeting History</h3>
          {meetingHistory.length === 0 ? (
            <p className="text-gray-700 mt-2">No past meetings found.</p>
          ) : (
            <>
              <ul className="mt-4 space-y-2">
                {meetingHistory.map((meeting, index) => (
                  <li key={index} className="text-gray-700 border-b pb-2">
                    <strong>{meeting.name}</strong> - {meeting.date} (
                    {meeting.day})
                  </li>
                ))}
              </ul>
              {/* Clear History Button */}
              <button
                onClick={handleClearHistory}
                className="mt-4 w-full bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md"
              >
                Clear History
              </button>
            </>
          )}
        </div>
      </div>

      {/* Coach Communication */}
      <div className="mt-10 w-full">
        <Message />
      </div>
    </div>
  );
};

export default AdminZoomMeetings;

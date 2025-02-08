import React, { useState, useEffect } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./Message"
const AdminZoomMeetings = () => {
  const [meetingLink, setMeetingLink] = useState(null);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [topic, setTopic] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Start Meeting
  const handleStartMeeting = async () => {
    if (!selectedUser) {
      toast.error("Please select a user before starting a meeting.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        style: { backgroundColor: "black", color: "white" },
      });
      return;
    }
  
    if (!topic.trim()) {
      toast.error("Please enter a topic for the meeting.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        style: { backgroundColor: "black", color: "white" },
      });
      return;
    }
  
    try {
      const { data } = await axios.post("http://localhost:5000/api/meeting/create", {
        userId: selectedUser,
        topic,
      });
  
      setMeetingLink(data.link);
  
      toast.success(`Meeting link sent to ${data.user}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        style: { backgroundColor: "black", color: "white" },
      });
  
      // Store meeting in history
      const newMeeting = {
        name: topic,
        date: new Date().toLocaleDateString(),
        day: new Date().toLocaleString("en-us", { weekday: "long" }),
        user: selectedUser,
      };
      setMeetingHistory((prev) => [...prev, newMeeting]);
  
      setTopic(""); // Clear topic input after starting meeting
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
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
          <label className="block text-sm font-medium text-gray-700 mt-4">Select a User:</label>
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
              <label className="block text-sm font-medium text-gray-700">Topic:</label>
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
              <p className="text-gray-700">Meeting Link:</p>
              <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold underline">
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
            <ul className="mt-4 space-y-2">
              {meetingHistory.map((meeting, index) => (
                <li key={index} className="text-gray-700 border-b pb-2">
                  <strong>{meeting.name}</strong> - {meeting.date} ({meeting.day})
                </li>
              ))}
            </ul>
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

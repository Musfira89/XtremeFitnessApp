import React, { useState, useEffect } from "react";
import { FaDumbbell, FaClipboardCheck } from "react-icons/fa";
import axios from "axios";
import Message from "./Message"; // Import Message component

const AdminZoomMeetings = () => {
  const [meetingLink, setMeetingLink] = useState(null);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [isLinkExpired, setIsLinkExpired] = useState(false);

  // Fetch meeting history from localStorage
  const fetchMeetingHistory = () => {
    const history = JSON.parse(localStorage.getItem("meetingHistory")) || [];
    setMeetingHistory(history);
  };

  // Store meeting history in localStorage
  const storeMeetingHistory = (newMeeting) => {
    const updatedHistory = [...meetingHistory, newMeeting];
    localStorage.setItem("meetingHistory", JSON.stringify(updatedHistory));
    setMeetingHistory(updatedHistory);
  };

  // Start Meeting Button Click
 const handleStartMeeting = async () => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/meeting/create");
    setMeetingLink(data.link);

    const newMeeting = {
      name: "Admin Weekly Check-in",
      date: new Date().toLocaleDateString(),
      day: new Date().toLocaleString("en-us", { weekday: "long" }),
    };
    storeMeetingHistory(newMeeting);

    setIsLinkExpired(false);
    setTimeout(() => {
      setIsLinkExpired(true); // This will set the link to expired after 30 minutes
    }, 30 * 60 * 1000); // 30 minutes in milliseconds
  } catch (error) {
    console.error("Error creating meeting:", error);
  }
};


  // Clear Meeting History
  const handleClearHistory = () => {
    localStorage.removeItem("meetingHistory");
    setMeetingHistory([]);
  };

  useEffect(() => {
    fetchMeetingHistory();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
        {/* Admin Info */}
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-6 max-w-3xl">
        <p className="text-sm font-medium">
          <strong>Admin Info:</strong> Meeting link will expire after 30 minutes.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-white to-red-50 dark:from-red-600 dark:to-red-500 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-red-700 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Start a New Meeting
          </h3>

          {!meetingLink && !isLinkExpired && (
            <button
              onClick={handleStartMeeting}
              className="mt-4 w-full bg-gradient-to-r from-red-700 to-red-800 text-white font-medium px-6 py-2 rounded-lg shadow-md"
            >
              Start Meeting
            </button>
          )}

          {meetingLink && !isLinkExpired && (
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Meeting Link:</p>
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {meetingLink}
              </a>
            </div>
          )}

          {isLinkExpired && (
            <>
              <p className="mt-4 text-red-600 font-semibold">Link expired!</p>
              <a
                href="#"
                className="mt-2 text-gray-400 cursor-not-allowed"
                onClick={(e) => e.preventDefault()}
              >
                {meetingLink}
              </a>
              <button
                onClick={handleStartMeeting}
                className="mt-4 w-full bg-gradient-to-r from-red-700 to-red-800 text-white font-medium px-6 py-2 rounded-lg shadow-md"
              >
                Start Meeting
              </button>
            </>
          )}
        </div>

        {/* Meeting History Section */}
        <div className="bg-gradient-to-r from-white to-blue-50 dark:from-red-600 dark:to-red-500 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-red-700 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Meeting History
          </h3>

          {meetingHistory.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              No past meetings found.
            </p>
          ) : (
            <ul className="mt-4">
              {meetingHistory.map((meeting, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <strong>{meeting.name}</strong> - {meeting.date} ({meeting.day})
                </li>
              ))}
            </ul>
          )}

          {meetingHistory.length > 0 && (
            <button onClick={handleClearHistory} className="mt-4 w-full bg-red-700 text-white px-6 py-2 rounded-lg shadow-md">
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Render Message Component */}
      <Message />
    </div>
  );
};

export default AdminZoomMeetings;

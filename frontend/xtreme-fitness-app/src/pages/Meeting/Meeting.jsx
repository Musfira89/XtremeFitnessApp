import React, { useState, useEffect } from "react";
import { FaClipboardList, FaClock, FaVideo } from "react-icons/fa";
import axios from "axios";
import Message from "./Message";
import { useParams } from "react-router-dom";

const ZoomMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/meeting/user/${userId}`);
        const uniqueMeetings = Array.from(new Set(response.data.map(m => m.id)))
          .map(id => response.data.find(m => m.id === id)); 
        setMeetings(uniqueMeetings);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, [userId]);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg w-full font-['Roboto','Segoe_UI']">
      {/* Info Section */}
      <div className="bg-yellow-100 dark:bg-yellow-700 border-l-4 border-yellow-500 p-4 rounded-lg text-gray-900 dark:text-gray-100 mb-8 shadow-sm">
        <p className="text-base font-semibold">
          ⚠️ <strong>Note:</strong> Meeting links expire 30 minutes after the scheduled time.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Upcoming Meetings Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full">
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center mb-4">
            <FaClipboardList className="mr-2" /> Upcoming Meetings
          </h3>

          <ul className="space-y-3 divide-y divide-gray-300 dark:divide-gray-700">
            {meetings.filter(meeting => new Date(meeting.expirationTime) > new Date()).map((meeting, index) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{meeting.topic}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <FaClock className="mr-2 text-gray-500" /> {new Date(meeting.expirationTime).toLocaleString()}
                  </p>
                </div>
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center shadow-sm transition-all"
                >
                  <FaVideo className="mr-2" /> Join Meeting
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Meeting History Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full">
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center mb-4">
            <FaClipboardList className="mr-2" /> Meeting History
          </h3>

          <ul className="space-y-3 divide-y divide-gray-300 dark:divide-gray-700">
            {meetings.filter(meeting => new Date(meeting.expirationTime) <= new Date()).length > 0 ? (
              meetings.filter(meeting => new Date(meeting.expirationTime) <= new Date()).map((meeting, index) => (
                <li key={index} className="py-4">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{meeting.topic}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <FaClock className="mr-2 text-gray-500" /> {new Date(meeting.expirationTime).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold text-center w-full mt-4">
                📜 No past meetings found.
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* Coach Communication */}
      <div className="mt-10 w-full">
        <Message />
      </div>
    </div>
  );
};

export default ZoomMeetings;

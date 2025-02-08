import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
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
    <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg w-full">
      {/* Info Section */}
      <div className="bg-yellow-100 dark:bg-yellow-700 border-l-4 border-yellow-500 p-4 rounded-lg text-gray-900 dark:text-gray-100 mb-8 shadow-sm">
        <p className="text-base font-semibold">
          ⚠️ <strong>Note:</strong> Meeting links expire 30 minutes after the scheduled time.
        </p>
      </div>

      {/* Display Meetings */}
      {meetings.length > 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full">
          <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center mb-4">
            <FaClipboardList className="mr-2" /> Upcoming Meetings
          </h3>

          <div className="space-y-4">
            {meetings.map((meeting, index) => (
              <div
                key={index}
                className="p-5 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex"
              >
                <div className="w-1/3 pr-4">
                  <h4 className="text-lg font-bold text-red-600 dark:text-red-400">Topic Name:</h4>
                  <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mt-2">Date:</h4>
                  <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mt-2">Meeting Link:</h4>
                </div>
                <div className="w-2/3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">{meeting.topic}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold mt-2">{new Date(meeting.expirationTime).toLocaleString()}</p>
                  <p className="mt-2">
                    <a
                      href={meeting.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Join Meeting
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold text-center w-full mt-4">
          🚀 No upcoming meetings at the moment.
        </p>
      )}

      {/* Coach Communication */}
      <div className="mt-10 w-full">
        <Message />
      </div>
    </div>
  );
};

export default ZoomMeetings;

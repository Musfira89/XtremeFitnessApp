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
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/meeting/user/${userId}`
        );
        const uniqueMeetings = Array.from(
          new Set(response.data.map((m) => m.id))
        ).map((id) => response.data.find((m) => m.id === id));
        setMeetings(uniqueMeetings);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, [userId]);

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl w-full max-w-6xl mx-auto font-sans space-y-6">
      {/* Info Section */}
      <div className="bg-indigo-100 dark:bg-indigo-800 border-l-4 border-indigo-500 p-4 rounded-lg text-indigo-900 dark:text-indigo-100 shadow">
        <p className="text-sm md:text-base font-semibold flex items-left">
          ⚠️ <strong className="ml-1"> Note: </strong> Meeting links expire 30 minutes after the scheduled time.
        </p>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 w-full">
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Upcoming Meetings
          </h3>
          <ul className="space-y-4">
            {meetings.filter((m) => new Date(m.expirationTime) > new Date()).map((m, i) => (
              <li key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-200">
                <div className="w-full">
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300">{m.topic}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaClock className="mr-2" /> {new Date(m.expirationTime).toLocaleString()}
                  </p>
                </div>
                <a
                  href={m.link}
                  target="_blank"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 mt-2 sm:mt-0 w-full sm:w-auto rounded-lg flex justify-center items-center transition-all"
                >
                  <FaVideo className="mr-2 text-lg" />
                  <span>Join</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Meeting History */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 w-full">
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Meeting History
          </h3>
          {meetings.filter((m) => new Date(m.expirationTime) <= new Date()).length > 0 ? (
            <ul className="space-y-4">
              {meetings
                .filter((m) => new Date(m.expirationTime) <= new Date())
                .map((m, i) => (
                  <li key={i} className="py-3 border-b border-gray-200">
                    <p className="text-base font-medium text-gray-700 dark:text-gray-300">{m.topic}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaClock className="mr-2" /> {new Date(m.expirationTime).toLocaleString()}
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 text-sm">📜 No past meetings found.</p>
          )}
        </div>
      </div>

      {/* Coach Communication */}
      <div className="w-full">
        <Message />
      </div>
    </div>
  );
};

export default ZoomMeetings;

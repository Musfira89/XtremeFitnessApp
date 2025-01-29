import React from "react";
import { FaDumbbell, FaClipboardCheck, FaComments } from "react-icons/fa";

const AdminZoomMeetings = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
        <FaDumbbell className="text-red-600 mr-3" />
        Zoom Meetings 
      </h2>

      {/* Upcoming and Past Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Meeting */}
        <div className="bg-gradient-to-r from-white to-red-50 dark:from-red-600 dark:to-red-500 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-red-700 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Scheduled Meetings
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            <strong>Topic:</strong> Admin Weekly Check-in
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Date:</strong> Sunday, 11 AM
          </p>
          <button className="mt-4 w-full bg-gradient-to-r from-red-700 to-red-800 text-white font-medium px-6 py-2 rounded-lg shadow-md">
            Start Meeting
          </button>
        </div>

        {/* Past Meetings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-red-700 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Meeting History
          </h3>
          <ul className="mt-6 space-y-4">
            <li className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">User Q&A</span>
              <span className="text-gray-400 dark:text-gray-500">Jan 25, 2025</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Monthly Updates</span>
              <span className="text-gray-400 dark:text-gray-500">Jan 20, 2025</span>
            </li>
          </ul>
        </div>
      </div>

      {/* User Messages */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-lg mt-6">
        <h3 className="text-lg font-bold text-red-700 flex items-center">
          <FaComments className="mr-2" />
          User Messages
        </h3>
        <div className="mt-6">
          {/* Message List */}
          <ul className="space-y-4">
            <li className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>User:</strong> John Doe
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Message:</strong> Can we reschedule the upcoming meeting?
              </p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-md shadow-md">
                  Reply
                </button>
                <button className="bg-gradient-to-r from-gray-400 to-gray-400 text-white px-4 py-2 rounded-md shadow-md">
                  Mark as Addressed
                </button>
              </div>
            </li>
            <li className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>User:</strong> Jane Smith
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Message:</strong> Will there be a recording of the last meeting?
              </p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-md shadow-md">
                  Reply
                </button>
                <button className="bg-gradient-to-r from-gray-400 to-gray-400 text-white px-4 py-2 rounded-md shadow-md">
                  Mark as Addressed
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminZoomMeetings;

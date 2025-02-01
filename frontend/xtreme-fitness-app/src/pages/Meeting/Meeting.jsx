import React from "react";
import { FaDumbbell, FaClipboardCheck, FaComments } from "react-icons/fa";
import Message from "./Message";

const ZoomMeetings = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
   <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-6 max-w-3xl">
        <p className="text-sm font-medium">
          <strong>Info:</strong> Meeting link will expire after 30 minutes.
        </p>
      </div>


      {/* Upcoming and Past Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Meeting */}
        <div className="bg-gradient-to-r from-red-100 to-red-50 dark:from-red-800 dark:to-red-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-red-600 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Upcoming Meeting
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            <strong>Topic:</strong> Weekly Progress Check-in
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Date:</strong> Sunday, 12:07 AM
          </p>
          <button className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md">
            Join Now
          </button>
        </div>

        {/* Past Meetings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-red-600 flex items-center">
            <FaClipboardCheck className="mr-2" />
            Past Meetings
          </h3>
          <ul className="mt-6 space-y-4">
            <li className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Progress Update</span>
              <span className="text-gray-400 dark:text-gray-500">Jan 20, 2025</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Initial Assessment</span>
              <span className="text-gray-400 dark:text-gray-500">Jan 15, 2025</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Coach Communication */}
    <Message/> 
    </div>
  );
};

export default ZoomMeetings;

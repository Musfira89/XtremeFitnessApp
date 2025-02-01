import { useState } from 'react';

export const useMeetingHistory = () => {
  const [meetingHistory, setMeetingHistory] = useState([]);

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

  // Clear meeting history
  const clearMeetingHistory = () => {
    localStorage.removeItem("meetingHistory");
    setMeetingHistory([]);
  };

  return { meetingHistory, fetchMeetingHistory, storeMeetingHistory, clearMeetingHistory };
};

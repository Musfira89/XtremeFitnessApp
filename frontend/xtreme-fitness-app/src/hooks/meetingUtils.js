// Function to start a meeting
export const startMeeting = async (setMeetingLink, setIsLinkExpired, storeMeetingHistory) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/meeting/create");
      setMeetingLink(data.link);
  
      // Add meeting history to localStorage
      const newMeeting = {
        name: `Admin Weekly Check-in`, // You can replace with dynamic name
        date: new Date().toLocaleDateString(),
        day: new Date().toLocaleString("en-us", { weekday: "long" }),
      };
      storeMeetingHistory(newMeeting);
  
      // Reset expired state and set expiration time (for testing)
      setIsLinkExpired(false);
      setTimeout(() => {
        setIsLinkExpired(true);
      }, 1000); // Expiration time for testing: 1 second
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };
  
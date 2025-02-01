import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const datesInMonth = Array.from({ length: 31 }, (_, index) => index + 1);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.getDate());
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-lg">
      {/* Calendar Header */}
      <div className="bg-red-700 text-white text-lg font-semibold py-3 rounded-md text-center mb-4">
        Select a Date
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-gray-600 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {datesInMonth.map((date) => (
          <div
            key={date}
            className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer text-lg font-medium transition-all duration-200
              ${
                date === currentDate
                  ? "bg-red-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              } 
              ${
                date === selectedDate
                  ? "bg-indigo-500 text-white scale-110 shadow-lg"
                  : ""
              }
            `}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </div>
        ))}
      </div>

      {/* Selected Date */}
      {selectedDate && (
        <div className="mt-6 text-center text-lg">
          <p className="text-gray-700">
            You selected:{" "}
            <span className="font-bold text-red-700">{selectedDate}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Calendar;

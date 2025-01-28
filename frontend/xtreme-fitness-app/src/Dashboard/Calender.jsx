import React, { useState } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Define the days of the week and sample dates to highlight (e.g., the 5th, 10th, and 15th).
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const datesInMonth = Array.from({ length: 31 }, (_, index) => index + 1); // Days 1-31

  // Sample dates to highlight
  const highlightedDates = [5, 10, 15];

  return (
    <div className="max-w-xl mx-auto  p-6 bg-white shadow-lg rounded-lg">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-4 text-center mb-4">
        {weekdays.map((day) => (
          <div key={day} className="font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-4 text-center">
        {datesInMonth.map((date) => (
          <div
            key={date}
            className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer ${
              highlightedDates.includes(date)
                ? "bg-red-500 text-white"
                : "text-gray-700"
            } hover:bg-gray-200`}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </div>
        ))}
      </div>

      {/* Selected Date */}
      {selectedDate && (
        <div className="mt-6 text-center text-lg text-gray-800">
          <p>You selected the date: <span className="font-bold text-red-500">{selectedDate}</span></p>
        </div>
      )}
    </div>
  );
};

export default Calendar;

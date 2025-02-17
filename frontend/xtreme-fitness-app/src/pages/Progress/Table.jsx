import React from "react";

const Table = ({ progressData }) => {
  const totalWeeks = progressData.length;

  // Ensure we have at least one week of data
  if (totalWeeks === 0) return <p className="text-center text-gray-500">No progress data available.</p>;

  // Select only the last two weeks for comparison
  const latestWeeks =
    totalWeeks > 1 ? progressData.slice(-2) : [progressData[0]];

  // Determine dynamic heading
  const heading =
    latestWeeks.length === 2
      ? `Progress Comparison (Week ${totalWeeks - 1} vs. Week ${totalWeeks})`
      : `Progress Tracking (Week ${totalWeeks})`;

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border-2 border-red-600">
      {/* Dynamic Header */}
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        {heading}
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-red-500 to-red-700 text-white">
              <th className="border border-gray-300 px-5 py-3 text-left rounded-tl-lg">
                Measurement
              </th>
              {latestWeeks.map((_, index) => (
                <th
                  key={index}
                  className={`border border-gray-300 px-5 py-3 text-center ${
                    index === latestWeeks.length - 1 ? "rounded-tr-lg" : ""
                  }`}
                >
                  Week {totalWeeks - latestWeeks.length + index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Weight (kg)", key: "weight" },
              { label: "Hips (cm)", key: "hips" },
              { label: "Chest (cm)", key: "chest" },
              { label: "Waist (cm)", key: "waist" },
            ].map((item, index) => (
              <tr
                key={index}
                className={`border-b transition-all hover:bg-red-100 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <td className="border border-gray-300 px-5 py-3 font-medium text-gray-800">
                  {item.label}
                </td>
                {latestWeeks.map((weekData, weekIndex) => (
                  <td
                    key={weekIndex}
                    className="border border-gray-300 px-5 py-3 text-center text-gray-700"
                  >
                    {weekData?.[item.key] ?? "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

import React from "react";

const Table = ({ progressData }) => {
  const totalWeeks = progressData.length;

  if (totalWeeks === 0)
    return <p className="text-center text-gray-500">No progress data available.</p>;

  const latestWeeks = totalWeeks > 1 ? progressData.slice(-2) : [progressData[0]];

  const heading =
    latestWeeks.length === 2
      ? `Progress Comparison (Week ${totalWeeks - 1} vs. Week ${totalWeeks})`
      : `Progress Tracking (Week ${totalWeeks})`;

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border-2 border-red-600 w-full max-w-4xl mx-auto overflow-hidden">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 text-center">
        {heading}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-gradient-to-r from-red-500 to-red-700 text-white">
              <th className="border border-gray-300 px-4 py-3 text-left rounded-tl-lg text-sm sm:text-base">
                Measurement
              </th>
              {latestWeeks.map((_, index) => (
                <th
                  key={index}
                  className={`border border-gray-300 px-4 py-3 text-center text-sm sm:text-base ${
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
              { key: "weight", label: "Weight (kg)" },
              { key: "hips", label: "Hips (cm)" },
              { key: "chest", label: "Chest (cm)" },
              { key: "waist", label: "Waist (cm)" },
            ].map(({ key, label }, index) => (
              <tr
                key={index}
                className={`border-b transition-all hover:bg-red-100 text-sm sm:text-base ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                  {label}
                </td>
                {latestWeeks.map((weekData, weekIndex) => (
                  <td
                    key={weekIndex}
                    className="border border-gray-300 px-4 py-3 text-center text-gray-700"
                  >
                    {weekData?.[key] ?? "N/A"}
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

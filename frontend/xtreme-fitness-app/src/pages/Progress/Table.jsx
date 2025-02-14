import React from "react";

const Table = ({ progressData }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border-2 border-red-600">
      {/* Header */}
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Progress Comparison (Week 1 vs. Week 2)
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-red-500 to-red-700 text-white">
              <th className="border border-gray-300 px-5 py-3 text-left rounded-tl-lg">
                Measurement
              </th>
              {progressData.map((_, index) => (
                <th
                  key={index}
                  className={`border border-gray-300 px-5 py-3 text-center ${
                    index === progressData.length - 1 ? "rounded-tr-lg" : ""
                  }`}
                >
                  Week {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Weight (kg)", key: "weight" },
              { label: "Hips (cm)", key: "hips" },
              { label: "Chest (cm)", key: "chest" },
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
                {progressData.map((weekData, weekIndex) => (
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

import React from "react";
import profileImage from "../../public/profile.png"; // Add your profile image or placeholder path

const ProfileCard = () => {
  return (
    <div className="bg-white text-white rounded-lg p-6 shadow-lg h-full">
      {/* Profile Header: Profile Picture and Name */}
      <div className="flex items-center space-x-4 mb-6">
        
        {/* User Profile Section */}
        <div className="flex flex-col items-center py-6 border-b bg-red-900">
          <img
            src={profileImage}
            alt="User Profile"
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
          <span className="text-gray-800 font-semibold text-md">John Doe</span>
          <span className="text-gray-500 text-sm">johndoe@example.com</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="font-semibold">Age:</span>
          <span>28</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Weight:</span>
          <span>75 kg</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Height:</span>
          <span>5'10"</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Goals:</span>
          <span>Lose 5 kg</span>
        </div>
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-red-700 transition-colors duration-300">
          View More
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

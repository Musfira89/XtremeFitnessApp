import React from "react";
import profileImage from "../../public/profile.png"; // Replace with your actual image path or placeholder image
import { FaRegUser, FaBirthdayCake, FaWeight, FaRuler } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className="p-6 w-full max-w-sm mx-auto">
      {/* Profile Header Section */}
      <div className="flex flex-col items-center bg-white text-red-700 rounded-lg py-6 mb-4">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-red-800"
        />
        <h2 className="font-bold text-xl text-red-800">John Doe</h2>
        <p className="text-sm text-red-600">johndoe@example.com</p>
      </div>

      {/* View More Button */}
      <div className="mt-6 flex justify-center">
        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300">
          See Full Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

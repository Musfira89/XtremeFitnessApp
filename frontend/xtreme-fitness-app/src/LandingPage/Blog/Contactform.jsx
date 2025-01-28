import React from "react";
import { PhoneOutlined, EmailOutlined } from "@mui/icons-material";

const ContactForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-8 py-12 mb-40">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-16">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-black text-center mb-8">
          Contact Us
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Name Field */}
          <input
            type="text"
            placeholder="Name"
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Phone Number Field */}
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Dropdown Field */}
          <select
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">How do you find us?</option>
            <option value="google">Google</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend/Family</option>
            <option value="other">Other</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-8 flex items-center justify-center space-x-12 text-gray-700">
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <PhoneOutlined className="text-red-600" />
            <p className="text-lg">(800) 383-0689</p>
          </div>
          {/* Email */}
          <div className="flex items-center space-x-2">
            <EmailOutlined className="text-red-600" />
            <p className="text-lg">Support@xtremeft.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

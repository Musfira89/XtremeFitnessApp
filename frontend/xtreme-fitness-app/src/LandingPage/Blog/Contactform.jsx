import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhoneOutlined, EmailOutlined } from "@mui/icons-material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "black", color: "white" },
      });

      setFormData({ name: "", email: "", phone: "", source: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "black", color: "white" },
      });
    }
  };

  return (
    <div id="contact-us" className="min-h-screen flex items-center justify-center bg-red-100 px-6 sm:px-8 py-12 mb-40">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 sm:p-12 md:p-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-black text-center mb-8">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">How did you find us?</option>
            <option value="google">Google</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend/Family</option>
            <option value="other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-5 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          ></textarea>

          <button type="submit" className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-300">
            Submit
          </button>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 text-gray-700">
          <div className="flex items-center space-x-2">
            <PhoneOutlined className="text-red-600" />
            <p className="text-lg">(800) 383-0689</p>
          </div>
          <div className="flex items-center space-x-2">
            <EmailOutlined className="text-red-600" />
            <p className="text-lg">Support@xtremeft.com</p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default ContactForm;

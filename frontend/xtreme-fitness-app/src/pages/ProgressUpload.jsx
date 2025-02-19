import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Animations
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProgressUpload = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [file, setFile] = useState(null);
  const { userId } = useParams();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!month || !year || !file) {
      toast.error("Please select all fields and upload an image!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "#000", color: "#fff" },
      });
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("image", file);

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      toast.success("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "#000", color: "#fff" },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "#000", color: "#fff" },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative">
      <ToastContainer />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 max-w-[70%] bg-yellow-100 p-4 rounded-lg shadow-md border border-yellow-200"
      >
        <p className="text-gray-700 text-xs font-medium">
          Your monthly progress images showcase your journey. Keep uploading your pictures and see how far you've come!
        </p>
      </motion.div>

      {/* Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 text-center"
      >
        <h2 className="text-[20px] font-bold text-gray-800 mb-10 font-sans">UPLOAD MONTHLY PROGRESS</h2>

        {/* Month Selection */}
        <select
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-red-500"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Year Selection */}
        <select
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-red-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {[2023, 2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {/* File Upload Box */}
        <label className="border-dashed border-2 border-gray-400 rounded-lg w-full p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition">
          <FaCloudUploadAlt className="text-gray-600 text-4xl mb-2" />
          <span className="text-gray-700">{file ? file.name : "Upload Image"}</span>
          <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
        </label>

        {/* Upload Button */}
        <button
          className="mt-6 w-full bg-red-700 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-800 transition"
          onClick={handleUpload}
        >
          Upload
        </button>
      </motion.div>
    </div>
  );
};

export default ProgressUpload;

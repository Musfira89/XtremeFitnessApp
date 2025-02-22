import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, Star, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const Feedback = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [fullName, setFullName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const { userId } = useParams(); 
  const navigate = useNavigate(); // 

  // Handles file selection
  const handleFileChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("Only PNG and JPG images are allowed.");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submits feedback to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!beforeImage || !afterImage || !feedbackText || rating === 0 || !fullName) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", fullName);
    formData.append("beforeImage", beforeImage);
    formData.append("afterImage", afterImage);
    formData.append("feedback", feedbackText);
    formData.append("rating", rating);

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/feedback/submit/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Feedback submitted successfully!");
        setBeforeImage(null);
        setAfterImage(null);
        setBeforePreview(null);
        setAfterPreview(null);
        setFeedbackText("");
        setRating(0);
        setFullName(""); 
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full bg-red-700 text-white flex items-center py-6 px-6 rounded-lg shadow-lg mb-16">
  <button onClick={() => navigate(-1)} className="mr-4">
    <ArrowLeft size={28} className="text-white cursor-pointer" />
  </button>
  <h1 className="text-4xl font-bold flex-grow text-center">User Feedback</h1>
</div>


      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Share Your Fitness Journey</h2>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full mb-6 p-4 border border-gray-300 rounded-lg"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <label className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50 w-full">
            {beforePreview ? (
              <img src={beforePreview} alt="Before Preview" className="h-32 w-full object-cover rounded-lg" />
            ) : (
              <>
                <UploadCloud className="text-gray-400 mb-2" size={40} />
                <p className="text-sm text-gray-600">Upload Before Image</p>
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="mt-2 hidden"
              onChange={(e) => handleFileChange(e, setBeforeImage, setBeforePreview)}
            />
          </label>

          <label className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50 w-full">
            {afterPreview ? (
              <img src={afterPreview} alt="After Preview" className="h-32 w-full object-cover rounded-lg" />
            ) : (
              <>
                <UploadCloud className="text-gray-400 mb-2" size={40} />
                <p className="text-sm text-gray-600">Upload After Image</p>
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="mt-2 hidden"
              onChange={(e) => handleFileChange(e, setAfterImage, setAfterPreview)}
            />
          </label>
        </div>

        <textarea
          placeholder="Describe your fitness progress..."
          className="w-full mb-6 p-4 border border-gray-300 rounded-lg h-32 resize-none"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        {/* Star Rating */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              size={32}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;

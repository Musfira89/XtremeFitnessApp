import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MonthlyProgress = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [progressImages, setProgressImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProgressImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/${userId}`);
        setProgressImages(response.data);
      } catch (error) {
        console.error("Error fetching progress images:", error);
      }
      setLoading(false);
    };

    fetchAllProgressImages();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      {/* HEADER SECTION */}
{/* HEADER SECTION */}
<motion.div
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white flex flex-wrap items-center gap-4 py-4 px-4 md:py-6 md:px-6 rounded-xl shadow-md mb-6 md:mb-9"
>
  <button
    onClick={() => navigate(-1)}
    className="p-1 sm:p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
  >
    <ArrowLeft size={20} className="text-white sm:size-18" />
  </button>
  <h1 className="text-md md:text-2xl lg:text-4xl font-bold flex-grow text-center">
    Your Monthly Progress
  </h1>
</motion.div>


      {/* LOADING STATE */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-center text-gray-500 text-lg"
        >
          Loading progress images...
        </motion.p>
      )}

      {/* NO IMAGES MESSAGE */}
      {!loading && progressImages.length === 0 && (
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-red-500 font-semibold text-xl"
        >
          No progress images found.
        </motion.p>
      )}


      {/* GRID LAYOUT FOR IMAGES */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {progressImages.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
          >
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-lg shadow-md">
              {image.month} {image.year}
            </div>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${image.image}`}
              alt="Progress"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA SECTION */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-16"
      >
        <p className="text-gray-700 text-sm">
          Want to add more progress images ? Start now and keep your journey
          documented!
        </p>
        <Link to={`/dashboard/${userId}/progress`}>
  <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition">
    Upload New Progress
  </button>
</Link>
      </motion.div>
    </div>
  );
};

export default MonthlyProgress;

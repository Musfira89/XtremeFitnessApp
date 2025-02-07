import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";
import thumbnailImage from "../../assets/thumbnail.png"; // Thumbnail image
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg"; // Background image

const PromotionalVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[80vh] flex items-center justify-center mb-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }} // Set background image
      initial={{ opacity: 0 }} // Fade-in effect
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {isPlaying ? (
        // Video iframe when playing
        <motion.div
          className="w-full h-full"
          onClick={() => setIsPlaying(false)} // Stop the video on click
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/i89fWv7g5Bg?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="object-cover"
          ></iframe>
        </motion.div>
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumbnailImage}
            alt="Promotional Thumbnail"
            className="w-full h-full object-cover"
          />

          {/* Play Button */}
          <motion.div
            className="absolute z-10 cursor-pointer"
            whileHover={{ scale: 1.2 }} // Enlarge on hover
            onClick={() => setIsPlaying(true)} // Start video on click
          >
            <PlayCircle className="text-white w-28 h-28" />
          </motion.div>
        </>
      )}

      {/* Pause Button */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-10 cursor-pointer z-20"
          whileHover={{ scale: 1.2 }} // Enlarge on hover
          onClick={() => setIsPlaying(false)} // Stop video on click
        >
          <PauseCircle className="text-white w-16 h-16" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PromotionalVideo;

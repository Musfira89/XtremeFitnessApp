import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import serviceImage1 from "../../assets/LandingPageImg/service1.png";
import serviceImage2 from "../../assets/LandingPageImg/service2.png";
import serviceImage3 from "../../assets/LandingPageImg/service3.png";
import serviceImage4 from "../../assets/LandingPageImg/service4.png"; // Fitness Chatbot
import serviceImage5 from "../../assets/LandingPageImg/service5.jpg"; // Meeting with Clients

const services = [
  {
    title: "Automated Workout Plans",
    image: serviceImage1,
  },
  {
    title: "Automated Meal Plans",
    image: serviceImage2,
  },
  {
    title: "Supplement Recommendation",
    image: serviceImage3,
  },
  {
    title: "Fitness Chatbot",
    image: serviceImage4,
  },
  {
    title: "Personal Coaching Session",
    image: serviceImage5,
  },
];

const Services = () => {
  return (
    <motion.section
      id="services"
      className="bg-red-50 py-16 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-black"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <div className="mt-3 h-1 w-24 md:w-32 bg-red-700 mx-auto"></div>
      </div>

      {/* Swiper Carousel */}
      <div className="container mx-auto px-12 relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={2}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          className="pb-12"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="w-11/12 mx-auto bg-white shadow-lg rounded-lg overflow-hidden text-center transition-all transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-60 object-cover"
                />
                <div className="bg-red-700 text-white py-6">
                  <span className="text-lg md:text-xl font-bold">{service.title}</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Pagination Dots (Placed Below) */}
        <div className="swiper-pagination mt-4"></div>
      </div>
    </motion.section>
  );
};

export default Services;

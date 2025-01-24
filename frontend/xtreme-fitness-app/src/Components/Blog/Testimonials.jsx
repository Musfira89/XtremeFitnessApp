import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This app transformed my fitness journey! The personalized workout plans and progress tracking tools are game-changers.",
      role: "Fitness Enthusiast",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jane Smith",
      feedback:
        "The diet plans are incredible! I’ve never felt healthier and more energetic. Highly recommend this app.",
      role: "Nutrition Coach",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Emily Johnson",
      feedback:
        "Flexible scheduling and amazing trainers. This app fits perfectly into my busy lifestyle!",
      role: "Working Professional",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="bg-white text-white py-16 px-6 mb-12">
      {/* Section Title */}
      <h2 className="text-center text-4xl font-bold text-red-600 mb-6">
        What Our Clients Say
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Hear from our happy clients who’ve transformed their fitness journey
        with us!
      </p>
      {/* Testimonials */}
      <div className="flex flex-col md:flex-row justify-center gap-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-gray-800 shadow-lg rounded-xl p-8 max-w-sm text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Highlighted Gradient Background */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500 to-transparent opacity-10 z-0"></div>
            <div className="relative z-10">
              {/* Client Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-gray-700"
              />
              {/* Feedback */}
              <p className="text-gray-300 italic mb-4">
                "{testimonial.feedback}"
              </p>
              {/* Client Name and Role */}
              <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

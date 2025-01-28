import React from "react";
import { SupportAgent } from "@mui/icons-material"; // Import red icon for support

const SupportSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-12 flex justify-center items-center min-h-screen"> {/* Center the inner div */}
        <div className="flex flex-col items-center p-24 bg-white shadow-md border border-gray-100 rounded-lg w-3/4">
          {/* Red Icon and Heading */}
          <div className="flex items-center space-x-2 mb-9">
            <SupportAgent className="text-red-600 text-4xl" />
            <h2 className="text-5xl font-bold text-center text-black">
              24/7 Support
            </h2>
          </div>

          {/* Description Text */}
          <p className="text-lg text-center text-gray-600 mt-4 max-w-4xl">
            We offer 24/7 support to ensure you have the assistance you need,
            whenever you need it. Our dedicated support team is always available
            to answer your questions, provide guidance, and help you overcome any
            challenges you may face. Whether it's late at night or early in the
            morning, we're here to support you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;

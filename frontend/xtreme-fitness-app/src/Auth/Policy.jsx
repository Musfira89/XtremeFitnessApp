import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* Main Heading */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-20">
        Privacy Policy
      </h1>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          <strong className="font-semibold">Xtreme Fitness Training LLC</strong> is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and disclose personal information from users of our website 
          located at <a href="https://www.xtremeft.com" className="text-blue-600 font-medium hover:underline">www.xtremeft.com</a> (the “Site”).
        </p>

        {/* Section: Data Collection */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">1. Data Collection</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            When you visit and use our Site, we may collect certain data about you. This includes, but is not limited to, 
            your IP address, operating system, browser type, and other technical details regarding your interaction with our Site.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            We may also collect personal information such as your name, email address, phone number, and any other information 
            you choose to provide us.
          </p>
        </div>

        {/* Section: Cookies and Tracking */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">2. Cookies and Tracking</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            We may use cookies to track your activity on our Site and collect data to enhance our services and improve 
            user experience.
          </p>
        </div>

        {/* Section: Contact Us */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">3. Contact Us</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            If you have any questions about this Privacy Policy, please contact us at
            <a href="mailto:support@xtremeft.com" className="text-blue-600 font-medium hover:underline"> support@xtremeft.com</a>.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/signup")}
          className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium text-sm rounded-md 
          shadow-sm hover:bg-blue-700 transition-all duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

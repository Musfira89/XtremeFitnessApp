import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* Main Heading */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
        Terms & Conditions
      </h1>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          <strong className="font-semibold">Xtreme Fitness Training LLC</strong> (“Xtreme Fitness”, “we”, “us”, “our”) 
          provides online fitness training and products (“Services”) to our customers through our website. These Terms 
          of Service (“Terms”) apply to all visitors, customers, and others who access or use our Services. By accessing 
          or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you do 
          not have permission to access or use the Services.
        </p>

        {/* Section: Use of Services */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">1. Use of Services</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            You must be at least 18 years old to use our Services. You may not use our Services for any illegal or unauthorized 
            purpose and are responsible for complying with all applicable laws. You agree to not reproduce, duplicate, copy, 
            or resell any portion of our Services, exploit them for commercial purposes, access non-public areas, interfere with 
            operations, attempt unauthorized searches, forge headers, use hidden metadata, engage in fraudulent or unlawful 
            activities, send unsolicited emails, or transmit harmful software.
          </p>
        </div>

        {/* Section: Content */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">2. Content</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            We reserve the right to remove any content that violates these Terms, our Privacy Policy, or applicable laws. You 
            are solely responsible for the content you post.
          </p>
        </div>

        {/* Section: Payments */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">3. Payments</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            You are responsible for all applicable taxes and fees. By using our Services, you agree to a recurring billing 
            agreement with Xtreme Fitness Training LLC.
          </p>
        </div>

        {/* Section: Termination */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">4. Termination</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            We may terminate or suspend your access immediately for any reason, including violation of these Terms. Provisions 
            regarding ownership, warranties, indemnity, and liability limitations will survive termination.
          </p>
        </div>

        {/* Section: Disclaimer of Warranties */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">5. Disclaimer of Warranties</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            Our Services are provided “as is,” without warranties of any kind, including merchantability, fitness for a 
            particular purpose, or uninterrupted availability.
          </p>
        </div>

        {/* Section: Limitation of Liability */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">6. Limitation of Liability</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            Xtreme Fitness Training LLC and its affiliates shall not be liable for indirect, incidental, or consequential 
            damages, including loss of profits, data, or goodwill, arising from access or use of Services, third-party content, 
            or unauthorized access to transmissions.
          </p>
        </div>

        {/* Section: Governing Law */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">7. Governing Law</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            These Terms are governed by the laws of Pennsylvania, USA. Failure to enforce any provision shall not constitute 
            a waiver. If any part is deemed invalid, the remaining Terms remain in effect.
          </p>
        </div>

        {/* Section: Changes */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">8. Changes</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            We may modify these Terms at our discretion. Material changes will be notified at least 30 days in advance. 
            Continued use after revisions constitutes acceptance of the new Terms.
          </p>
        </div>

        {/* Section: Contact Us */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">9. Contact Us</h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            For questions, contact us at{" "}
            <a href="mailto:support@xtremeft.com" className="text-blue-600 font-medium hover:underline">
              support@xtremeft.com
            </a>.
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

export default Terms;
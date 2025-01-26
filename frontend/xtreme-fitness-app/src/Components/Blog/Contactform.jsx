import React from "react";

const ContactForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-700 via-red-800 to-red-400 px-6 py-12">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section */}
          <div>
            <h1 className="text-4xl font-extrabold text-red-800 mb-6">Ask Us Anything</h1>
            <p className="text-gray-600 text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum nulla eu posuere scelerisque.
            </p>
            <div className="space-y-6">
              <div className="text-gray-700">
                <p>251 Purple Sunset Avenue</p>
                <p>Brooklyn, BXY 92101</p>
                <p>powerlift@example.com</p>
              </div>
              <div className="text-gray-700">
                <p>(800) 383-0689</p>
                <p>Support@xtremeft.com</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-5 py-4 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="email"
                  placeholder="E-mail address"
                  className="w-full px-5 py-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-5 py-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Message */}
              <textarea
                placeholder="Drop us a few lines here..."
                rows="5"
                className="w-full px-5 py-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-red-700 text-white font-bold uppercase rounded-lg shadow-lg hover:bg-red-800 transition duration-300"
              >
                Send Us A Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

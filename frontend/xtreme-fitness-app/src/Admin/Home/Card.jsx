import React from "react";
import { Link } from "react-router-dom";

const QuestionnaireCard = () => {
  return (
    <div className="w-full p-8 bg-white rounded-3xl shadow-3xl transform transition-all hover:scale-105 hover:shadow-4xl mx-auto max-w-lg border-2 border-red-200">
      <h3 className="text-3xl font-bold text-gray-800 mb-4 tracking-wide">
        Questionnaire
      </h3>
      <p className="text-md text-gray-600 mb-6 leading-relaxed">
        Admin can view submitted questionnaires to analyze user needs and make
        informed decisions.
      </p>
      <Link
        to="/admin/questionaire"
        className="bg-gradient-to-r from-red-500 to-red-800 text-white font-semibold py-3 px-8 rounded-lg text-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        View Questionnaire
      </Link>
    </div>
  );
};

export default QuestionnaireCard;

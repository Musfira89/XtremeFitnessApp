import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import bgImage from '../assets/Background.jpg'; // Adjust the path based on your folder structure

const FitnessPrograms = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const programs = [
    {
      id: 1,
      name: 'Weight Loss Program',
      duration: '8 weeks',
      price: '$50',
      description: 'Designed to help you shed those extra pounds effectively.',
    },
    {
      id: 2,
      name: 'Muscle Gain Program',
      duration: '12 weeks',
      price: '$70',
      description: 'Perfect for building muscle and gaining strength.',
    },
    {
      id: 3,
      name: 'Endurance Training',
      duration: '6 weeks',
      price: '$40',
      description: 'Enhance your stamina and endurance with this program.',
    },
  ];

  const handleSelectProgram = (programId) => {
    console.log(`Selected Program ID: ${programId}`);
    // Navigate to payment page
    navigate('/payment'); // Redirect to /payment page
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-6xl bg-white bg-opacity-90 p-10 shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-14 text-center">
          Choose Your Fitness Program
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:text-white transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {program.name}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <p className="text-gray-800 mb-2">
                  <span className="font-semibold">Duration:</span> {program.duration}
                </p>
                <p className="text-gray-800 font-bold text-lg">
                  <span className="font-semibold">Price:</span> {program.price}
                </p>
              </div>
              <button
                onClick={() => handleSelectProgram(program.id)}
                className="w-full bg-black text-white py-3 text-center font-medium  transition-all"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessPrograms;

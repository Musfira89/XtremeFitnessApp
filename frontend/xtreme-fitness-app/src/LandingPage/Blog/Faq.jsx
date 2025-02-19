import React, { useState } from "react";
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "Xtreme Fitness Training offers a comprehensive fitness coaching service online. Services include personalized workout plans, customized nutritional plans, flexible scheduling, progress tracking, 100% accountability and the expertise of certified Trainers. Xtreme Fitness Training is dedicated to helping individuals achieve their fitness goals and lead healthier lives.",
    },
    {
      question: "How do I get started?",
      answer:
        "Create an account, fill out the health quiz, choose a fitness program and make payment. You will then receive your customized fitness program within 24 hours to begin your fitness journey.",
    },
    {
      question: "Which equipment (s) do I need for online workouts?",
      answer:
        "For online workouts with Xtreme Fitness Training, the equipment you may need includes items like an exercise mat, dumbbells, resistance bands, a kettlebell, jump rope, yoga block, stability ball, foam roller, pull-up bar, bench or step platform, fitness tracker, heart rate monitor, proper footwear, water bottle, towel, and sound system/headphones. The specific equipment depends on your fitness goals and the workouts customized by your coach.",
    },
    {
      question: "How Do You Track Progress, And Can I See My Results?",
      answer:
        "Yes, once you sign up with us, you will have a separate dashboard through which you can see your progress.",
    },
    {
      question: "How much water should I drink?",
      answer:
        "You should drink half your bodyweight in ounces. For example, a 200lb Male, half of body weight is 100lbs, so he must consume at least 100 oz per day.",
    },
    {
      question: "How do I lose belly fat?",
      answer:
        "You cannot spot reduce fat. Body fat is reduced from all over once you are on a fat loss program. Xtreme Fitness Training offers great programs for fat loss.",
    },
    {
      question: "How soon will I see results?",
      answer:
        "Xtreme Fitness Training customized programs are designed to see results every 7 days. Results will vary based on how closely you follow the program.",
    },
    {
      question: "How to contact someone if I need assistance?",
      answer: (
        <>
          Call us at 800 383 0689 during our operating hours for immediate assistance. For non-urgent inquiries or detailed questions, please email us at <span style={{ color: 'red', fontWeight: 'bold' }}>support@xtremeft.com</span>. We aim to respond within 24 hours.
        </>
      ),
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
    id="faq"
      className="relative h-screen bg-cover bg-center flex items-center justify-center mt-44 mb-2"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-8 shadow-xl w-11/12 md:w-3/4 lg:w-1/2">
        <h1 className="text-4xl font-extrabold text-red-700 text-center mb-12">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-700 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span
                  className={`text-xl transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-red-600" : "text-gray-500"
                  }`}
                >
                  +
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-gray-600 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

export const questionsData = [
  {
    step: 1,
    title: "Demographics",
    questions: [
      {
        id: 1,
        question: "What is your gender?",
        options: ["Male", "Female", "Other"],
      },
      {
        id: 2,
        question: "What is your age?",
        options: ["18-24", "25-34", "35-44", "45+"],
      },
      {
        id: 3,
        question: "Enter your height in feet and inches or centimeters?",
        options: ["18-24", "25-34", "35-44", "45+"],
      },
      {
        id: 4,
        question: "Enter your current weight in kilograms or pounds.",
        options: ["18-24", "25-34", "35-44", "45+"],
      },
    ],
  },
  {
    step: 2,
    title: "Fitness Questionnaire",
    questions: [
      {
        id: 1,
        question: "What is your current physical activity level?",
        options: [
          "Sedentary (little or no exercise)",
          "Lightly active (1-3 days/week)",
          "Moderately active (3-5 days/week)",
          "Very active (6-7 days/week)",
          "Super active (exercise twice a day)",
        ],
      },
      {
        id: 2,
        question: "Do you engage in weightlifting exercises?",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    step: 3,
    title: "Nutrition & Exercise Habits",
    questions: [
      {
        id: 1,
        question: "How many meals do you eat per day?",
        options: ["1 meal", "2 meals", "3 meals", "More than 3 meals"],
      },
      {
        id: 2,
        question: "Do you drink enough water daily?",
        options: ["Yes", "No"],
      },
    ],
  },
];

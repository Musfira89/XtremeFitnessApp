import React, { useState } from "react";

// Dummy data for Meal & Workout Plans
const initialPlans = [
  { id: 1, name: "Breakfast Plan", description: "Oatmeal, Eggs, and Avocado" },
  { id: 2, name: "Workout Plan", description: "Cardio + Strength Training" },
];

const MealWorkoutPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [newPlan, setNewPlan] = useState({ name: "", description: "" });
  const [editingPlan, setEditingPlan] = useState(null);

  const handleChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.description) {
      setPlans([...plans, { id: plans.length + 1, ...newPlan }]);
      setNewPlan({ name: "", description: "" });
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setNewPlan({ name: plan.name, description: plan.description });
  };

  const handleSaveEdit = () => {
    setPlans(
      plans.map((plan) =>
        plan.id === editingPlan.id
          ? { ...plan, name: newPlan.name, description: newPlan.description }
          : plan
      )
    );
    setEditingPlan(null);
    setNewPlan({ name: "", description: "" });
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <section className="bg-gradient-to-r from-red-500 to-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Meal & Workout Plans</h2>

      {/* Add/Edit Form */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          value={newPlan.name}
          onChange={handleChange}
          placeholder="Plan Name"
          className="w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none"
        />
        <textarea
          name="description"
          value={newPlan.description}
          onChange={handleChange}
          placeholder="Plan Description"
          className="w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none"
        />
        {editingPlan ? (
          <button
            onClick={handleSaveEdit}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleAddPlan}
            className="w-full bg-green-500 text-white p-3 rounded-md"
          >
            Add Plan
          </button>
        )}
      </div>

      {/* Display Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-gray-600">{plan.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditPlan(plan)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePlan(plan.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MealWorkoutPlans;

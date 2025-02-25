import Progress from "../models/workoutProgress.js";

/**
 * Update workout progress
 */
export const updateWProgress = async (req, res) => {
  try {
    const { userId, day, exerciseIndex, completed } = req.body;

    let progress = await Progress.findOne({ userId, day });

    if (!progress) {
      progress = new Progress({
        userId,
        day,
        exercises: [{ index: exerciseIndex, completed }],
      });
    } else {
      const exercise = progress.exercises.find((ex) => ex.index === exerciseIndex);

      if (exercise) {
        exercise.completed = completed;
      } else {
        progress.exercises.push({ index: exerciseIndex, completed });
      }
    }

    // Calculate completion percentage
    const totalExercises = progress.exercises.length;
    const completedExercises = progress.exercises.filter((ex) => ex.completed).length;
    progress.progressPercentage = Math.round((completedExercises / totalExercises) * 100);

    await progress.save();
    return res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get user progress
 */
export const getWProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId });

    return res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

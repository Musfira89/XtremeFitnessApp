import Response from "../models/Response.js";

export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all responses for Demographics category
    const responses = await Response.find({ userId, category: "Demographics" })
      .select("answers");

    // Extract relevant data
    const progressData = responses.map((response) => {
      if (!response.answers || !Array.isArray(response.answers)) {
        return {
          weight: null,
          hips: null,
          chest: null,
          waist: null,
        };
      }

      const weightAnswer = response.answers.find((ans) =>
        ans.questionText?.trim().toLowerCase().includes("weight")
      );

      const hipsAnswer = response.answers.find(
        (ans) =>
          ans.questionText?.trim().toLowerCase().includes("hips") ||
          ans.questionText?.trim().toLowerCase().includes("hip circumference")
      );

      const chestAnswer = response.answers.find((ans) =>
        ans.questionText?.trim().toLowerCase().includes("chest")
      );

      const waistAnswer = response.answers.find((ans) =>
        ans.questionText?.trim().toLowerCase().includes("waist")
      );

      return {
        weight: weightAnswer ? parseFloat(weightAnswer.answer) || null : null,
        hips: hipsAnswer ? parseFloat(hipsAnswer.answer) || null : null,
        chest: chestAnswer ? parseFloat(chestAnswer.answer) || null : null,
        waist: waistAnswer ? parseFloat(waistAnswer.answer) || null : null,
      };
    });

    res.json(progressData);
  } catch (error) {
    console.error("Error fetching user progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const checkEligibility = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the latest response
    const lastResponse = await Response.findOne({ userId, category: "Demographics" })
      .sort({ createdAt: -1 }) // Get latest response
      .select("createdAt");

    if (!lastResponse) {
      return res.json({ eligible: true }); // First-time users are eligible
    }

    // Check if one week has passed
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const isEligible = new Date(lastResponse.createdAt) <= oneWeekAgo;
    
    res.json({ eligible: isEligible });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




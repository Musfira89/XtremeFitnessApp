import cron from "node-cron";
import User from "./models/auth.js";

cron.schedule("0 0 * * *", async () => { // Runs daily at midnight
  try {
    const now = new Date();

    // Find expired trial users
    const expiredTrialUsers = await User.find({
      trialExpiryDate: { $lte: now },
      plan: null, // Only affect trial users
      subscriptionStatus: "active",
    });

    for (const user of expiredTrialUsers) {
      user.subscriptionStatus = "inactive";
      await user.save();
    }

    console.log(`${expiredTrialUsers.length} trial users updated to inactive`);

    // Find expired paid users
    const expiredPaidUsers = await User.find({
      planExpiry: { $lte: now }, // If planExpiry is before or equal to now
      subscriptionStatus: "active",
    });

    for (const user of expiredPaidUsers) {
      user.subscriptionStatus = "inactive"; // Mark as inactive
      user.plan = null; // Remove the plan
      await user.save();
    }

    console.log(`${expiredPaidUsers.length} paid users updated to inactive`);

  } catch (error) {
    console.error("Error updating subscription statuses:", error);
  }
});

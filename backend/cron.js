import cron from "node-cron";
import User from "./models/auth.js";

cron.schedule("0 0 * * *", async () => { // Runs daily at midnight
  try {
    const expiredUsers = await User.find({
      trialExpiryDate: { $lte: new Date() },
      plan: null, // Only affect trial users
    });

    for (const user of expiredUsers) {
      user.subscriptionStatus = "inactive";
      await user.save();
    }

    console.log(`${expiredUsers.length} trial users updated to inactive`);
  } catch (error) {
    console.error("Error updating trial status:", error);
  }
});

import cron from "node-cron";
import User from "./models/auth.js";
import sendEmail from "./emailScheduler.js";
import path from "path";
import EmailTemplate from "email-templates";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const email = new EmailTemplate({
  views: {
    root: path.join(__dirname, "templates"), // ✅ Fixed
    options: { extension: "ejs" },
  },
});

// ✅ Renewal Email Cron Job (Runs Every Minute)
cron.schedule("* * * * *", async () => {
  console.log("✅ Cron job script loaded.");

  try {
    console.log(`[${new Date().toISOString()}] Cron job started for renewal emails.`);

    // 🔹 Ensure Correct Timestamp Formats
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setUTCDate(now.getUTCDate() + 3);
    threeDaysLater.setUTCHours(23, 59, 59, 999); // End of the day

    console.log("Now (UTC):", now.toISOString());
    console.log("Three days later (UTC):", threeDaysLater.toISOString());

    // 🔹 Debugging: Check Users in DB
    const debugUsers = await User.find({}, { email: 1, planExpiry: 1 }).limit(5);
    console.log("Users in DB:", debugUsers);

    // 🔹 Find Users Whose Plan is Expiring Within 3 Days
    const expiringUsers = await User.find({
      planExpiry: { $gte: now, $lte: threeDaysLater },
      subscriptionStatus: "active",
      isTrialUser: false, // Exclude free trial users
    }).populate("plan");

    console.log(`[${new Date().toISOString()}] Found ${expiringUsers.length} users whose plan is expiring within 3 days.`);

    if (expiringUsers.length === 0) {
      console.log("No users found. Skipping email sending.");
      return;
    }

    for (const user of expiringUsers) {
      console.log(`Processing user: ${user.email}`);

      if (!user.plan) {
        console.log(`Skipping user ${user.email} - No plan assigned.`);
        continue;
      }

      const discountPrice = user.plan.price * 0.9; // 10% discount
      console.log(`User ${user.email} plan: ${user.plan.name}, Discount Price: ${discountPrice}`);

      try {
        // Generate Stripe checkout link
        const renewalSession = await createRenewalCheckoutSession(user._id, user.plan._id, discountPrice);
        console.log(`Generated Stripe checkout link for ${user.email}: ${renewalSession.url}`);

        // Send renewal email
        await sendRenewalEmail(user.email, user.fullName, user.plan.name, renewalSession.url);
        console.log(`✅ Renewal email sent to ${user.email}`);
      } catch (error) {
        console.error(`❌ Error processing user ${user.email}:`, error);
      }
    }

    console.log(`[${new Date().toISOString()}] Finished processing renewal emails.`);
  } catch (error) {
    console.error("Error sending renewal emails:", error);
  }
});



cron.schedule("0 8 * * 1", async () => { 
  console.log(`[${new Date().toISOString()}] Cron job triggered: Sending weekly emails.`);

  try {
    const now = new Date();
    const activeUsers = await User.find({ subscriptionStatus: "active" }).populate("plan");

    console.log(`Found ${activeUsers.length} active users.`);

    for (const user of activeUsers) {
      console.log(`Checking user: ${user.email}`, user);

      if (!user.plan || !user.plan.name) {
        console.log(`Skipping user ${user.email} - No plan assigned.`);
        continue;
      }

      const planName = user.plan.name;
      console.log(`User ${user.email} has plan: ${planName}`);

      // Use createdAt instead of subscriptionStartDate
      const startDate = new Date(user.createdAt);

      if (isNaN(startDate.getTime())) {
        console.log(`Skipping ${user.email} - Invalid creation date.`);
        continue;
      }

      const weekNumber = Math.ceil((now - startDate) / (7 * 24 * 60 * 60 * 1000));

      // Generate email template
      const emailHtml = await email.render(`${planName}/week${weekNumber}`, {
        clientName: user.fullName,  // <-- Ensure it matches the EJS placeholder
        senderName: "XtremeFt Fitness Team", // <-- Correct placeholder replacement
      });
      
      if (emailHtml) {
        await sendEmail({
          to: user.email,
          subject: `Weekly Check-in - Week ${weekNumber}`,
          html: emailHtml,
        });

        console.log(`✅ Email sent to ${user.email} for Week ${weekNumber}`);
      } else {
        console.log(`❌ No email found for Week ${weekNumber}`);
      }
    }

    console.log("✅ Weekly email processing completed.");
  } catch (error) {
    console.error("❌ Error sending weekly emails:", error);
  }
});

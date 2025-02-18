import cron from "node-cron";
import User from "./models/auth.js";
import sendEmail from "./emailScheduler.js";
import path from "path";
import EmailTemplate from "email-templates";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import moment from "moment-timezone";
import { sendRenewalEmail } from './sendRenewalEmail.js';
import {createRenewalCheckoutSession  } from "./controllers/webhooks.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const email = new EmailTemplate({
  views: {
    root: path.join(__dirname, "templates"), // ✅ Fixed
    options: { extension: "ejs" },
  },
});

cron.schedule("0 8 * * 1", async () => { 
  try {
    const currentDateTime = moment(); // Current date and time
    console.log(`Current Date and Time: ${currentDateTime.format()}`);

    const users = await User.find({
      subscriptionStatus: 'active',
      plan: { $exists: true },
    }).populate('plan');

    console.log(`Users found: ${users.length}`);

    if (users.length > 0) {
      for (const user of users) {
        // Check if the user's plan is either Xtreme Platinum or Xtreme Gold
        if (user.plan.name !== 'Xtreme Platinum' && user.plan.name !== 'Xtreme Gold') {
          console.log(`Skipping renewal email for ${user.email} (Plan: ${user.plan.name})`);
          continue; // Skip the user if their plan is not Platinum or Gold
        }

        const priceString = user.plan.price.match(/[0-9,.]+/)[0]; // Extract numeric part
        const price = Number(priceString);
        if (isNaN(price)) {
          console.error("Invalid price found for user", user.email);
          continue;
        }

        const discountedPrice = Math.round(price * 0.9 * 100);
        const durationWeeks = user.plan.durationWeeks; // Get the duration in weeks

        console.log(`Sending renewal email to: ${user.email} (Plan: ${user.plan.name})`);

        const checkoutUrl = await createRenewalCheckoutSession(user._id, user.plan.name, discountedPrice);

        // Send renewal email with the durationWeeks value
        await sendRenewalEmail(user.email, user.fullName, user.plan.name, checkoutUrl.url, durationWeeks);

        console.log(`Renewal email sent to: ${user.email}`);
      }
      console.log(`Renewal emails sent to active users with Xtreme Platinum or Gold plans.`);
    } else {
      console.log('No active users found for renewal emails.');
    }
  } catch (error) {
    console.error('Error sending renewal emails:', error);
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

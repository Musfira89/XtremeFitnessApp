import moment from "moment";

// Function to get today's meal from the meal plan
export const getTodayMeal = (mealPlan) => {
  const todayIndex = moment().isoWeekday() - 1; // Get today's index (0 for Monday, ..., 6 for Sunday)
  return mealPlan[todayIndex] || null;
};

// Function to send the daily reminder notification
export const sendDailyReminder = (meal) => {
  if (!meal) return;

  if (Notification.permission === "granted") {
    new Notification("Meal Plan Reminder", {
      body: `Follow your meal plan today! Meal: ${Object.keys(meal).join(", ")}`,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Meal Plan Reminder", {
          body: `Follow your meal plan today! Meal: ${Object.keys(meal).join(", ")}`,
        });
      }
    });
  }
};

// Function to schedule the daily reminder at 8 AM
export const scheduleDailyReminder = (callback) => {
  const now = new Date();
  const nextReminder = new Date();
  nextReminder.setHours(8, 0, 0, 0);

  if (now > nextReminder) {
    nextReminder.setDate(nextReminder.getDate() + 1); // Move to the next day if past 8 AM
  }

  const timeUntilNextReminder = nextReminder - now;

  setTimeout(() => {
    callback(); // Call the function to fetch meals and trigger notification
    scheduleDailyReminder(callback); // Reschedule for the next day
  }, timeUntilNextReminder);
};

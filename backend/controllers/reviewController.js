// import puppeteer from "puppeteer";

// export const getGoogleReviews = async (req, res) => {
//   try {
//     const businessUrl =
//       "https://www.google.com/maps/place/Xtreme+Fitness+Training+LLC/@24.9170097,67.016666,12z/data=!4m8!3m7!1s0x89c261820d3a36cd:0x8775fd6725ff3f0a!8m2!3d40.698979!4d-73.782586!9m1!1b1!16s%2Fg%2F11h79njg10?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D";

//     const browser = await puppeteer.launch({
//       headless: false, // Set to true if you don't need to see the browser
//       args: ["--disable-features=site-per-process"],
//     });

//     const page = await browser.newPage();

//     // Set a real user agent to avoid detection
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//     );

//     await page.goto(businessUrl, { waitUntil: "domcontentloaded" });

//     console.log("Page loaded. Waiting for reviews section...");

//     // Click on the "Reviews" tab
//     try {
//       await page.waitForSelector('button[jsaction="pane.reviewChart.moreReviews"]', { timeout: 10000 });
//       await page.click('button[jsaction="pane.reviewChart.moreReviews"]');
//       await page.waitForNavigation({ waitUntil: "domcontentloaded" });
//     } catch (error) {
//       console.warn("Reviews button not found or frame detached, continuing...");
//     }

//     // Ensure the reviews container is available before scrolling
//     await page.waitForSelector('[data-review-id]', { timeout: 20000 });

//     console.log("Reviews section loaded. Scrolling to fetch more reviews...");

//     // Scroll to load more reviews
//     let previousHeight;
//     let maxScrollAttempts = 20;
//     let attempt = 0;

//     while (attempt < maxScrollAttempts) {
//       previousHeight = await page.evaluate(() => document.body.scrollHeight);
//       await page.evaluate(() => window.scrollBy(0, window.innerHeight));

//       // Wait for new content to load
//       await page.waitForTimeout(4000);

//       let reviewsLoaded = await page.evaluate(() => document.querySelectorAll('[data-review-id]').length);

//       console.log(`Scroll attempt ${attempt + 1}: ${reviewsLoaded} reviews loaded...`);

//       if (reviewsLoaded >= 50) break; // Stop if 50+ reviews are loaded

//       let newHeight = await page.evaluate(() => document.body.scrollHeight);
//       if (newHeight === previousHeight) break; // Stop if no more reviews load

//       attempt++;
//     }

//     // Scrape reviews and split them into two arrays
//     const reviewsData = await page.evaluate(() => {
//       const reviewElements = Array.from(document.querySelectorAll('[data-review-id]'));
      
//       // Array 1: Reviewers and Dates
//       const authorsAndDates = reviewElements.map((review) => ({
//         author: review.querySelector('.TSUbDb')?.textContent.trim() || "Anonymous",
//         date: review.querySelector('.rsqaWe')?.textContent.trim() || "No date",
//       }));

//       // Array 2: Review Text and Ratings
//       const textsAndRatings = reviewElements.map((review) => ({
//         rating: review.querySelector('.kvMYJc')?.getAttribute("aria-label") || "No rating",
//         text: review.querySelector('.Jtu6Td')?.textContent.trim() || "No review text",
//       }));

//       return { authorsAndDates, textsAndRatings };
//     });

//     console.log(`Total reviews scraped: ${reviewsData.authorsAndDates.length}`);

//     await browser.close();
    
//     // Return response with two separate arrays
//     res.json({
//       authorsAndDates: reviewsData.authorsAndDates,
//       textsAndRatings: reviewsData.textsAndRatings,
//     });

//   } catch (error) {
//     console.error("Error scraping Google Reviews:", error);
//     res.status(500).json({ error: "Failed to fetch reviews" });
//   }
// };

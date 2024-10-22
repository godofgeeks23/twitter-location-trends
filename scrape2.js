const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTrends(url) {
  try {
    // Fetch the HTML content from the URL
    const { data } = await axios.get(url);

    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(data);

    // Initialize an array to hold the trend data grouped by title
    let trendsByTitle = [];

    // Iterate over each list-container within the timeline-container
    $("#timeline-container .list-container").each((i, listContainer) => {
      // Extract the title (time ago information) from h3.title
      let title = $(listContainer).find("h3.title").text().trim();

      // Initialize an array to hold the trends for this list-container
      let trends = [];

      // Within each list-container, find the trend-card__list and its list items
      $(listContainer)
        .find("ol.trend-card__list li")
        .each((j, li) => {
          // Extract the trend name
          let trendName = $(li)
            .find("span.trend-name a.trend-link")
            .text()
            .trim();

          // Extract the tweet count
          let tweetCount = $(li).find("span.tweet-count").text().trim();

          // Extract the trend link from the a tag with class trend-link inside trend-name
          let trendLink = $(li)
            .find("span.trend-name a.trend-link")
            .attr("href");

          // Add the extracted data to the trends array
          trends.push({ trendName, tweetCount, trendLink });
        });

      // Add the title and its associated trends to the trendsByTitle array
      trendsByTitle.push({ title, trends });
    });

    // Output the trendsByTitle array in JSON format
    console.log(JSON.stringify(trendsByTitle, null, 2));
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

const supported_cities = [
  "ahmedabad",
  "amritsar",
  "bangalore",
  "bhopal",
  "chennai",
  "delhi",
  "hyderabad",
  "indore",
  "jaipur",
  "kanpur",
  "kolkata",
  "lucknow",
  "mumbai",
  "nagpur",
  "patna",
  "pune",
  "rajkot",
  "ranchi",
  "srinagar",
  "surat",
  "thane",
];

// example - scrape trends for lucknow
scrapeTrends("https://trends24.in/india/lucknow/");

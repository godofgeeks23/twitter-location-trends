const { TwitterApi } = require("twitter-api-v2");

// Initialize Twitter client with your credentials
const client = new TwitterApi("your bearer token here"); // Use your Bearer Token

// Main function
async function main() {
  const locationName = process.argv[2]; // Get location name from command line arguments

  if (!locationName) {
    console.log('Usage: node get_trends.js "Location Name"');
    return;
  }

  try {
    // Use the Geo API to get coordinates for the location
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        locationName
      )}&format=json&limit=1`
    );
    const geoData = await geoResponse.json();

    if (!geoData.length) {
      throw new Error(`Location "${locationName}" not found.`);
    }

    const { lat, lon } = geoData[0];

    // Search for popular tweets in the area
    const tweets = await client.v2.search("trends", {
      "geo.place.fields":
        "contained_within,country,country_code,full_name,geo,id,name,place_type",
      expansions: "geo.place_id",
      "user.fields": "username",
      max_results: 5,
      sort_order: "relevancy",
    });

    console.log(`Trending tweets in ${locationName}:\n`);
    for (const tweet of tweets.data) {
      console.log(`- ${tweet.text}`);
    }
  } catch (error) {
    console.error(`\nError: ${error.message}`);
  }
}

main();

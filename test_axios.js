const axios = require("axios");

const woeid = 26062; // Specify the WOEID - where on earth ID for the location you want to fetch trends for
const apiUrl = `https://api.x.com/2/trends/by/woeid/${woeid}`;
const token = "AAAAA"; // Replace with your actual Bearer token from Twitter developer account

axios
  .get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log("Trends Data:", response.data);
  })
  .catch((error) => {
    console.error(
      "Error fetching trends:",
      error.response ? error.response.data : error.message
    );
  });

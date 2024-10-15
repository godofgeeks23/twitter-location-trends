import { Client } from "twitter-api-sdk";

async function main() {
  const client = new Client("your bearer token here");

  const response = await client.tweets.tweetsRecentSearch({
    "max_results": 10,
    "sort_order": "relevancy",
    "tweet.fields": [
        "geo"
    ],
    "expansions": [
        "geo.place_id"
    ],
    "place.fields": [
        "contained_within",
        "country",
        "country_code",
        "full_name",
        "geo",
        "id",
        "name",
        "place_type"
    ]
  });
  
  console.log("response", JSON.stringify(response, null, 2));
}
  
main();
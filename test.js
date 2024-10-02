import { TwitterApi } from 'twitter-api-v2';

// By default, client are created with the max right-level (Read+Write+DMs)
const client = new TwitterApi('AAAAA');

const jsTweets = await client.v2.search('JavaScript', { 'media.fields': 'url' });

// Consume every possible tweet of jsTweets (until rate limit is hit)
for await (const tweet of jsTweets) {
  console.log(tweet);
}

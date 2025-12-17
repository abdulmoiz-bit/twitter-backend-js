//const { client } = require("./client");
import {client} from "./client.js"

async function publishTweetEvent(tweet) {
  await client.xAdd(
    "new_tweets_stream",
    "*",  // auto ID
    {
      tweetId: tweet.id,
      authorId: tweet.authorId
    }
  );
}

//module.exports = { publishTweetEvent };
export {publishTweetEvent}

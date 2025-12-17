const {client} = require("../services/client");
import { getFollowers } from "../services/userService.js";

export const processTweetEvent = async (tweetId, authorId) => {
  const followers = await getFollowers(authorId);

  for (const followerId of followers) {

    // LPUSH to client feed list
    await client.lPush(`feed:${followerId}`, tweetId);

    // trim feed to size (keep latest 500)
    await client.lTrim(`feed:${followerId}`, 0, 500);
  }

  console.log(`Fanned out tweet ${tweetId} to ${followers.length} followers`);
};

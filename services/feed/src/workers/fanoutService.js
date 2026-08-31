import {client} from "../redis/client.js"
import { getFollowers } from "../services/followingApi.js"

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

import {client} from "../services/client.js"
import Tweet from "../models/tweetModel.js"

const getFeed = async (req, res) => {
   const userId = req.user.id;
  //const cacheKey = `feed:${userId}`

  /*
  const cachedFeed = await redis.get(cacheKey);
  if(cachedFeed){
    return res.json(JSON.parse(cachedFeed));
  }
  */

  const followingIds = await getFollowing(userId);
  const tweets = await Tweet.find({
    user: { $in: followingIds }
  }).sort({ createdAt: -1 }).limit(50);

  //await redis.setExpire(cacheKey, 30, JSON.stringify(tweets));

  res.json(tweets);
};



const getHomeFeed = async (req, res) => {
  const userId = req.user.id;

  const tweetIds = await client.lRange(`feed:${userId}`, 0, 50);

  // then fetch tweets from DB
  const tweets = await Tweet.find({ id: { $in: tweetIds } });

  res.json(tweets);
};



export { getFeed, getHomeFeed }
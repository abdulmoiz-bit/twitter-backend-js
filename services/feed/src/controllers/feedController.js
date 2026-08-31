//import Tweet from "../models/tweetModel.js"
import {client} from "../redis/client.js"



// FANOUT WRITE METHOD
/*
const getFeed = async (req, res) => {
   const userId = req.user.id;
  //const cacheKey = `feed:${userId}`

  /*
  const cachedFeed = await redis.get(cacheKey);
  if(cachedFeed){
    return res.json(JSON.parse(cachedFeed));
  }
/*
  const followingIds = await getFollowing(userId);
  const tweets = await Tweet.find({
    user: { $in: followingIds }
  }).sort({ createdAt: -1 }).limit(50);

  //await redis.setExpire(cacheKey, 30, JSON.stringify(tweets));

  res.json(tweets);
};
*/


// FANOUT READ METHOD
/*
const generateFeed = async (req, res) => {
  const userId = req.user.id;

  const tweetIds = await client.lRange(`feed:${userId}`, 0, 50);

  // then fetch tweets from DB
  const tweets = await Tweet.find({ id: { $in: tweetIds } });

  res.json(tweets);
};

export { generateFeed }
*/




// FANOUT WRITE METHOD
const getFeed = async (req, res) => {
  const userId = req.user.id;
  // fetch feed from redis
 const tweetIds = await client.lRange(`feed:${userId}`, 0, 50);

  const parsedTweets = tweetIds.map(tweet =>
      JSON.parse(tweet)
    );

    return res.json({
      success: true,
      count: parsedTweets.length,
      data: parsedTweets
    });

}

export {getFeed}
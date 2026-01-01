import Tweet from "../models/tweetModel.js";
//const Tweet = require("./../models/tweetModel");
//const Comment = require("./../models/commentModel");
//const {getUserById} = require("../services/userApi")
//const { publishTweetEvent } = require("../services/streamService");
import { publishTweetEvent } from "../services/streamService.js";
//import { getUserById } from "../services/userApi.js";
import { getFollowing } from "../services/userApi.js";
//import { redis } from "../services/client.js";

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.find();
  //console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    results: tweets.length,
    data: {
      tweets,
    },
    //requestedAt: req.requestTime,
  });
};

/*
const setTweetId = (req, res, next) => {
  //if (!req.body.tweet) req.body.tweet = req.tweet.id;
  if(!req.body.tweetId) req.body.tweetId = req.params.tweetId;
  next();
};  
*/

const postTweet = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;
  //const{userId} = req.body;
  const newTweet = await Tweet.create({
    text,
    userId: userId,
  });
  console.log(newTweet);
  await publishTweetEvent(newTweet);
  res.status(201).json({
    status: "success",
    data: {
      tweet: newTweet,
    },
    // tweet : newTweet
  });
};

const getTweetsByUserId = async (req, res) => {
  //const tweets = await Tweet.findById(req.params.userId);
  const tweets = await Tweet.find({ userId: req.params.userId });
  res.status(200).json({
    status: "success",
    results: tweets.length,
    data: {
      tweets,
    },
  });
};

// via rest api communication to User Service to get user details
/*
exports.postTweet = async (req, res) => {
  const {text} = req.body;
  const {userId} = req.body;
  const user = await getUserById(userId)
  //const newTweet = await Tweet.create(req.body);
  const newTweet = await Tweet.create({
    text,
    userId : user._id,
    username: user.username,
    name: user.name,
    email: user.name,
    followers: user.followers,
    following: user.following
  })
  console.log(newTweet);
  res.status(201).json({
    status: "success",
    data: {
      tweet: newTweet,
    },
  });
};

*/

/*
exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
*/

/*
exports.postComment = async (req, res, next) => {
  const { text } = req.body;
  const { tweetId } = req.params;
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    return res.status(404).json({
      status: "fail",
      message: "Tweet not found",
    });
  }
  const comment = await Comment.create({
    text,
    tweet: tweetId,
    user: req.user.id,
  });
  //const newTweetReply = await Reply.create(req.body);
  //console.log(newTweetReply);
  res.status(201).json({
    status: "success",
    data: { comment },
  });
};
*/

/*
exports.getReplies = async (req,res) => {

}
*/

/*

exports.toggleLike = async (req, res, next) => {
 // const userId = req.user.id;
  const tweetId = req.params.tweetId;

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    return res.status(404).json({
      status: "fail",
      message: "Tweet not found",
    });
  }

  const alreadyLiked = tweet.likes.includes(userId);
  if (alreadyLiked) {
    tweet.likes.pull(userId);
  } else {
    tweet.likes.push(userId);
  }


  await tweet.save();
  res.status(200).json({
    status: "success",
   // message: alreadyLiked ? "Tweet unliked" : "Tweet Liked",
    data: {
      likesCount: tweet.likes.length,
    },
  });
};
*/

/*
exports.getTweetLikes = async (req, res) => {
  const tweet = await Tweet.findById(req.params.tweetId).populate(
    "likes",
    "username"
  );
  res.status(200).json({
    status: "success",
    results: tweet.likes.length,
    data: { users: tweet.likes },
  });
};

/*
exports.deleteTweet = async (req, res) => {

}
*/




// FANOUT READ METHOD
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
    user: { $in: followingIds },
  })
    .sort({ createdAt: -1 })
    .limit(50);

  //await redis.setExpire(cacheKey, 30, JSON.stringify(tweets));

  res.json(tweets);
};

export { getAllTweets, postTweet, getTweetsByUserId, getFeed };

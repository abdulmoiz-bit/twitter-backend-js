import Tweet from "../models/tweetModel.js";
//const Tweet = require("./../models/tweetModel");
//const Comment = require("./../models/commentModel");
//const {getUserById} = require("../services/userApi")
//const { publishTweetEvent } = require("../services/streamService");
//import { publishTweetEvent } from "../services/streamService.js";
//import { getUserById } from "../services/userApi.js";
//import { getFollowing } from "../services/userApi.js";
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


const postTweet = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;
  //const{userId} = req.body;
  const newTweet = await Tweet.create({
    text,
    userId: userId,
  });
  console.log(newTweet);
  //await publishTweetEvent(newTweet);
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
exports.getReplies = async (req,res) => {

}
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



export { getAllTweets, postTweet, getTweetsByUserId};

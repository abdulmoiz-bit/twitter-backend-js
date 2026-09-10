import Tweet from "../models/tweetModel.js";
//import { publishTweetEvent } from "../services/streamService.js";
//import { getUserById } from "../services/userApi.js";
//import { getFollowing } from "../services/userApi.js";
//import { redis } from "../services/client.js";
//import {producer} from "../kafka/producer.js"
//import jwt from "jsonwebtoken";
//import dotenv from "dotenv";



export const getAllTweets = async (req, res) => {
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


export const postTweet = async (req, res) => {
  const {text} = req.body;
  const userId = req.user?.id;
  //const{userId} = req.body;
  const newTweet = await Tweet.create({
    text,
    userId: userId,
  });
  console.log(newTweet);
  /* KAFKA
  await producer.send({
    topic: "feed",
    messages: [
      {
        key: newTweet.userId,
        value: JSON.stringify({
          data: newTweet
        })
      }
    ]
  })
    */
  //await publishTweetEvent(newTweet);
  res.status(201).json({
    status: "success",
    data: {
      tweet: newTweet,
    },
  });
};





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

/*
export const toggleLikeCount = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { action } = req.body; // "increment" | "decrement"

    const delta = action === "increment" ? 1 : action === "decrement" ? -1 : null;
    if (delta === null) {
      return res.status(400).json({
        status: "fail",
        message: 'action must be "increment" or "decrement"',
      });
    }

    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $inc: { likesCount: delta } },
      { new: true }
    );

    if (!tweet) {
      return res.status(404).json({ status: "fail", message: "Tweet not found" });
    }

    res.status(200).json({
      status: "success",
      data: { likesCount: tweet.likesCount },
    });
  } catch (err) {
    next(err);
  }
};
*/

// tweet.controller.js  (Tweet service) — the completed stub
export const toggleLikeCount = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { action } = req.body;

    const delta = action === "increment" ? 1 : action === "decrement" ? -1 : null;
    if (delta === null) {
      return res.status(400).json({
        status: "fail",
        message: 'action must be "increment" or "decrement"',
      });
    }

    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $inc: { likesCount: delta } },
      { new: true }
    );

    if (!tweet) {
      return res.status(404).json({ status: "fail", message: "Tweet not found" });
    }

    res.status(200).json({
      status: "success",
      data: { likesCount: tweet.likesCount },
    });
  } catch (err) {
    next(err);
  }
};


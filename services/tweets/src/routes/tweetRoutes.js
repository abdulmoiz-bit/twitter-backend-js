//const express = require("express");
import express from "express";
//import tweetController from "../controllers/tweetController.js"
import protect from "../middlewares/auth.js"
import {getAllTweets, postTweet, getTweetsByUserId, getFeed} from "../controllers/tweetController.js"
//const tweetController = require("../controllers/tweetController");
//const authController = require("../middlewares/auth")

const router = express.Router();

// GET ALL TWEETS
router.get("/", getAllTweets);

// CREATE A NEW TWEET
router.post(
  "/",
  protect,
  //authController.protect,
  //tweetController.setUserId,
  postTweet
  //authController.restrictTo("user")
);

// EDIT A TWEET
router.patch("/:id, protect, postTweet");

// DELETE A TWEET
//router.delete('/:id', protect, deleteTour);

// GET ALL TWEETS BY A SPECIFIC USER (FOR TWEET SERVICE)
router.get("/:userId", getTweetsByUserId);

// CREATE A REPLY
//router.post('/:tweetId/replies', postReplies);

// GET ALL REPLIES OF A TWEET
//router.get('/:tweetId/replies', getReplies);

// POST A LIKE
//router.patch('/:tweetId/like', toggleLike);

// GET ALL LIKES OF A TWEET
//router.get('/:tweetId/likes', getTweetLikes);

// POST A RETWEET
//router.patch('/:tweetId/retweet', protect, toggleRetweet);

// GET ALL RETWEETS OF A TWEET
//router.get('/:tweetId/retweets', getRetweets);

// CREATE A BOOKMARK
//router.patch('/:tweetId/bookmark', protect, toggleBookmark);

// GET ALL BOOKMARKS OF A TWEET
//router.get('/:tweetId/bookmarks', getBookmarks);



//module.exports = router;
export default router;
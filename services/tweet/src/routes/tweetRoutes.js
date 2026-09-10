import express from "express";
import {getAllTweets, postTweet, toggleLikeCount} from "../controllers/tweetController.js"


const router = express.Router();

// GET ALL TWEETS
router.get("/", getAllTweets);

// CREATE A NEW TWEET
router.post(
  "/",
  postTweet
);

// EDIT A TWEET
//router.patch("/:id", protect, postTweet);

// DELETE A TWEET
//router.delete('/:id', protect, deleteTour);


// GET ALL REPLIES OF A TWEET
//router.get('/:tweetId/replies', getReplies);


// GET ALL LIKES OF A TWEET
//router.get('/:tweetId/likes', getTweetLikes);


// GET ALL RETWEETS OF A TWEET
//router.get('/:tweetId/retweets', getRetweets);


// GET ALL BOOKMARKS OF A TWEET
//router.get('/:tweetId/bookmarks', getBookmarks);



// tweet.routes.js
router.patch("/:tweetId/toggle-like-count", toggleLikeCount);


export default router;
import express from "express";
import protect from "../middlewares/auth.js"
import {getAllTweets, postTweet, getTweetsByUserId} from "../controllers/tweetController.js"


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
router.patch("/:id", protect, postTweet);

// DELETE A TWEET
//router.delete('/:id', protect, deleteTour);

// GET ALL TWEETS BY A SPECIFIC USER (FOR TWEET SERVICE)
router.get("/:userId", getTweetsByUserId);


// GET ALL REPLIES OF A TWEET
//router.get('/:tweetId/replies', getReplies);


// GET ALL LIKES OF A TWEET
//router.get('/:tweetId/likes', getTweetLikes);


// GET ALL RETWEETS OF A TWEET
//router.get('/:tweetId/retweets', getRetweets);


// GET ALL BOOKMARKS OF A TWEET
//router.get('/:tweetId/bookmarks', getBookmarks);


export default router;
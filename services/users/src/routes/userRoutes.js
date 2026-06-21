import { Router } from "express";
import {createUser, getUser, getAllUsers, protect, getFollowers, getUserTweets, getFollowing, incrementFollowers, incrementFollowing, decrementFollowers, decrementFollowing} from "../controllers/userController.js"; 

const router = Router();

// CREATE A NEW USER
router.post("/", createUser);

// LOGIN A USER
//router.post("/login", login);

// GET ALL USERS
router.get("/", getAllUsers);

// GET A SPECIFIC USER
router.get("/:id", getUser);

// UPDATE A USER
//router.put("/:id", protect, createUser)

// PARTIALLY UPDATE A USER
//router.patch("/:id", protect, createUser);

// DELETE A USER
//router.delete('/:id', protect, deleteUser);

// GET ALL FOLLOWERS OF A USER
router.get('/:id/followers', getFollowers);

// GET ALL FOLLOWING OF A USER
router.get('/:id/following', getFollowing);

// GET ALL TWEETS OF A USER
router.get("/:id/tweets", getUserTweets);

// GET A SPECIFIC TWEET OF A USER
//router.get("/:id/tweets/:tweetId", getSpecificUserTweet);

// GET ALL REPLIES OF A USER
//router.get("/:id/comments", userController.getUserReplies);

// GET ALL LIKES OF A USER
//router.get("/:id/likes", userController.getUserLikes);

// GET ALL BOOKMARKS OF A USER
//router.get("/:id/bookmarks", userController.getUserBookmarks);

// INCREMENT/DECREMENT FOLLOWERS AND FOLLOWING COUNT
router.patch("/:id/increment-followers", incrementFollowers);
router.patch("/:id/decreament-followers", decrementFollowers);
router.patch("/:id/increment-following", incrementFollowing);
router.patch("/:id/decrement-following", decrementFollowing);



export default router;
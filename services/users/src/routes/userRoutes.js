import { Router } from "express";
import {createUser, getUser, login, getAllUsers, protect, toggleFollow, getFollowers, getUserTweets, getFollowing} from "../controllers/userController.js"; 

const router = Router();

// CREATE A NEW USER
router.post("/signup", createUser);

// LOGIN A USER
router.post("/login", login);

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


// TOGGLE FOLLOW/UNFOLLOW A USER
router.patch('/:id/follow', protect, toggleFollow);




export default router;
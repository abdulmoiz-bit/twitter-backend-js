import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { getTweetsByUserId } from "../services/tweetApi.js";


const createUser = async (req, res) => {
  const { userId, username, name} = req.body;
  const user = await User.create({
    userId,
    username,
    name,
  });
  console.log("User created", user)
};



const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};



const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};


const getUserTweets = async (req, res) => {
  const tweets = await getTweetsByUserId(req.params.id);
  res.status(200).json({
    status: "success",
    results: tweets.length,
    data: {
      tweets
    }
  })
}
  //const user = await User.findById(req.params.id).populate('tweets');
  //const tweets = await Tweet.find({ user: req.params.id }).sort({ createdAt: -1 });
  //const tweets = await Tweet.find({ user: req.params.id });
  /*
  res.status(200).json({
    status: "success",
    results: tweets.length,
    data: {
      tweets,
    },
  });
  */

/*
const getSpecificUserTweet = async (req, res) => {
  //const tweet = await Tweet.findOne({ _id: tweetId, user: userId });
  const tweet = await Tweet.findById(req.params.tweetId);
  res.status(200).json({
    status: "success",
    data: {
      tweet,
    },
  });
};
/*

/*
exports.deleteUser = async(req, res)=> {

}
*/


const getFollowers = async (req, res) => {
  const user = await User.findById(req.params.id).populate("followers", "name");
  res.status(200).json({
    status: "success",
    result: user.followers.length,
    data: {
      follower: user.followers
    }
  })
}


const getFollowing = async(req,res) => {
  const user = await User.findById(req.params.id).populate("following", "name");
    res.status(200).json({
      status: "success",
      result: user.following.length,
      data: {
        following: user.following
      }
    })
}

// this should be in api-gateway

const protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new Error("you are not logged in"));
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error("the user is not exist"));
  }

  // GRANT ACCESS
  req.user = currentUser;
  next();
};



/*
exports.restrictTo = (...roles) => {
  
}
*/


export {createUser, getUser, getAllUsers, protect, getFollowers, getFollowing, getUserTweets};



// increment followers
export const incrementFollowers = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $inc: { followersCount: 1 } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { user }
  });
};

// decrement followers
export const decrementFollowers = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $inc: { followersCount: -1 } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { user }
  });
};

// increment following
export const incrementFollowing = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $inc: { followingCount: 1 } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { user }
  });
};

// decrement following
export const decrementFollowing = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $inc: { followingCount: -1 } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { user }
  });
};
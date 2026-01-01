import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { getTweetsByUserId } from "../services/tweetApi.js";


const createUser = async (req, res) => {
  const { username, name} = req.body;
  const user = await User.create({
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

/*

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


// LOGIN

const login = async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    throw new Error("please provide email and passowrd");
  }

  // 2) Check if user exists && password is correct
  // +passoword can not understand
  const user = await User.findOne({ email }).select("+password");

  // solve this immediately
  /*
  if (!user || !(await user.correctpassword(password, user.password))) {
    throw new Error("incorrect email or password");
  }
  */
 /*
  createSendToken(user, 200, res);
};
*/

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



const toggleFollow = async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user.id;

  if (targetUserId === currentUserId) {
    return res.status(400).json({
      status: "fail",
      message: "you cannot follow yourself",
    });
  }
  const targetUser = await User.findById(targetUserId);
  const currentUser = await User.findById(currentUserId);
  if (!targetUser) {
    return res.status(404).json({
      status: "fail",
      message: "target user not found",
    });
  }
  const isFollowing = currentUser.following.includes(targetUserId);
  if (isFollowing) {
    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(currentUserId);
  } else {
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);
  }

  await currentUser.save();
  await targetUser.save();

  res.status(200).json({
    status: "success",
    message: isFollowing ? "Unfollowed successfully" : "Followed Successfully",
    data: {
      followingCount: currentUser.following.length,
      followersCount: targetUser.followers.length,
    },
  });
};


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




export {createUser, getUser, getAllUsers, protect, toggleFollow, getFollowers, getFollowing, getUserTweets};
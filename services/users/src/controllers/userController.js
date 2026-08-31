import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { getTweetsByUserId } from "../services/tweetApi.js";
import dotenv from "dotenv";


const createUser = async (req, res) => {
  const { userId, username, name, email} = req.body;
  const user = await User.create({
    userId,
    email,
    username,
    name,
  });
  console.log("User created", user) 
};


/*
exports.deleteUser = async(req, res)=> {

}
*/

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


// FOLLOW A USER
/*
const followUser = async (req, res) => {
  const userIdToFollow = req.params.id;
  const currentUserId = req.user._id;
  following.push(userIdToFollow);
  followers.push(currentUserId);
}
  */
  const toggleFollow = async (req, res) => {
    const targetUserId = req.params.id;
    const currentUser = req.user;
    const currentUserId = currentUser.userId;

    if (targetUserId == currentUserId.toString()) {
      return res.status(400).json({
        status: "fail",
        message: "you cannot follow yourself",
      });
    }
    const targetUser = await User.findOne({userId: targetUserId});
    //const targetUser = await User.findById(targetUserId);
    //const currentUser = await User.findById(currentUserId);
    if (!currentUser || !targetUser) {
      return res.status(404).json({
        status: "fail",
        message: currentUser ? "target user not found" : "current user not found",
      });
    }
    
    const isFollowing = currentUser.following.some(
      (userId) => userId.toString() === targetUser.userId.toString()
    );
    if (isFollowing) {
      currentUser.following.pull(targetUser.userId);
      targetUser.followers.pull(currentUser.userId);
    } else {
      currentUser.following.push(targetUser.userId);
      targetUser.followers.push(currentUser.userId);
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



/*
exports.restrictTo = (...roles) => {
  
}
*/


export {createUser, getUser, getAllUsers, getFollowers, getFollowing, getUserTweets, toggleFollow};


/*
// increment followers
export const incrementFollowers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const delta = action === "increment" ? 1 : action === "decrement" ? -1 : null;
    if (delta === null) {
      return res.status(400).json({
        status: "fail",
        message: 'action must be "increment" or "decrement"',
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $inc: { followersCount: delta } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: { followersCount: user.followersCount },
    });
  } catch (err) {
    next(err);
  }
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
*/
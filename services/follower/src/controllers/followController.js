import { decrementFollowingCount, incrementFollowersCount, decrementFollowersCount, incrementFollowingCount, getUserById } from "../services/userApi.js";
import Follow from "../model/followModel.js";

const toggleFollow = async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user.id;

  if (targetUserId === currentUserId) {
    return res.status(400).json({
      status: "fail",
      message: "you cannot follow yourself",
    });
  }

  const targetUser = await getUserById(targetUserId);
  const currentUser = await getUserById(currentUserId);

  if (!targetUser) {
    return res.status(404).json({
      status: "fail",
      message: "target user not found",
    });
  }
  //const isFollowing = currentUser.following.includes(targetUserId);
  // unfollow if already following, otherwise follow
  /*
  if (isFollowing) {
    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(currentUserId); // this is not present in the user model
  } else {
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);  // this is not present in the user model
  }
  */
  const existingFollow = await Follow.findOne({
    followerId: currentUserId,
    followingId: targetUserId,
  });
  if (existingFollow) {
    await Follow.deleteOne({
      followerId: currentUserId,
      followingId: targetUserId,
    });

    await decreamentFollowersCount(targetUserId);
    await decrementFollowingCount(currentUserId);
  }

  await Follow.create({
    followerId: currentUserId,
    followingId: targetUserId,
  });

  await incrementFollowersCount(targetUserId);
  await incrementFollowingCount(currentUserId);

  // currentUserId should be followerId and targetUserId should be followingId
  //await currentUser.save();
  //await targetUser.save();

  res.status(200).json({
    status: "success",
    message: isFollowing ? "Unfollowed successfully" : "Followed Successfully",
    data: {
      followingCount: currentUser.following.length,
      followersCount: targetUser.followers.length,
    },
  });
};

export { toggleFollow };

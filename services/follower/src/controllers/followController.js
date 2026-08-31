import { decrementFollowersCount, decrementFollowingCount, incrementFollowersCount, incrementFollowingCount, getUserById } from "../services/userApi.js";
import Follow from "../model/followModel.js";

const toggleFollow = async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user?.id;

  if (!currentUserId) {
    return res.status(401).json({
      status: "fail",
      message: "Not logged in",
    });
  }

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
  
  const existingFollow = await Follow.findOne({
    followerId: currentUserId,
    followingId: targetUserId,
  });

  if (existingFollow) {
    await Follow.deleteOne({
      followerId: currentUserId,
      followingId: targetUserId,
    });
    await decrementFollowersCount(targetUserId);
    await decrementFollowingCount(currentUserId);

    return res.status(200).json({
      status: "success",
      message: "Unfollowed successfully",
      data: {
        followingCount: currentUser?.following?.length || 0,
        followersCount: targetUser?.followers?.length || 0,
      },
    });
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
    message: "Followed successfully",
    data: {
      followingCount: currentUser?.following?.length || 0,
      followersCount: targetUser?.followers?.length || 0,
    },
  });
};

export { toggleFollow };

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

export {toggleFollow};
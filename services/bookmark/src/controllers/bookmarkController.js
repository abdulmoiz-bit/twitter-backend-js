import Bookmark from "../models/bookmarkModel";

export const addBookmark = async(req, res) => {
  const userId = req.user.id;
  const tweetId = req.params.id
  const bookmark = await Bookmark.create({
    userId,
    tweetId
  })
  res.status(201).json({
    status: "success",
    data: {
        bookmark
    }
  })

}


/*
export const reTweet = async(req, res) => {
    const tweetId = req.params.tweetId;
    const userId = req.body.userId;

    const like = await Like.create({
        tweetId,
        userId
    })
    res.status(201).json({
        status: "success",
        data: {
            like
        }
    })
}
*/
export const protect = async (req, res, next) => {
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


export const togglereTweet = async (req, res, next) => {
 // const userId = req.user.id;
  const tweetId = req.params.tweetId;

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    return res.status(404).json({
      status: "fail",
      message: "Tweet not found",
    });
  }

  const alreadyLiked = tweet.likes.includes(userId);
  if (alreadyLiked) {
    tweet.likes.pull(userId);
  } else {
    tweet.likes.push(userId);
  }


  await tweet.save();
  res.status(200).json({
    status: "success",
   // message: alreadyLiked ? "Tweet unliked" : "Tweet Liked",
    data: {
      likesCount: tweet.likes.length,
    },
  });
};

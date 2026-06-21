import Like from "../models/likeModel";
//import amqplib from "amqplib";


export const likeTweet = async(req, res) => {
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



/*

exports.toggleLike = async (req, res, next) => {
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
*/
import Like from "../models/likeModel.js";
import {syncLikeCount} from "../services/tweetApi.js";


export const toggleLike = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user?.id; // from auth middleware — never req.body

    const existingLike = await Like.findOne({ tweetId, userId });

    if (existingLike) {
      await existingLike.deleteOne();

      try {
        await syncLikeCount(tweetId, "decrement");
      } catch (err) {
        console.error(`Like-count sync (decrement) failed for tweet ${tweetId}:`, err.message);
      }

      return res.status(200).json({
        status: "success",
        data: { liked: false },
      });
    }

    const like = await Like.create({ tweetId, userId });

    try {
      await syncLikeCount(tweetId, "increment");
    } catch (err) {
      console.error(`Like-count sync (increment) failed for tweet ${tweetId}:`, err.message);
    }

    return res.status(201).json({
      status: "success",
      data: { liked: true, like },
    });
  } catch (err) {
    next(err);
  }
};
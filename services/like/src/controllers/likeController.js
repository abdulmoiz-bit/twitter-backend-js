import Like from "../models/likeModel";


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
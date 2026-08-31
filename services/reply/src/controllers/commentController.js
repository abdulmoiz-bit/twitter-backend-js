import Comment from "../models/commentModel";



/*
const setTweetId = (req, res, next) => {
  //if (!req.body.tweet) req.body.tweet = req.tweet.id;
  if(!req.body.tweetId) req.body.tweetId = req.params.tweetId;
  next();
};  
*/

const createComment = async (req, res) => {
const {text} = req.body;
 const tweetId = req.params.tweetId;
 const userId = req.user.id;
 const comment = await Comment.create({
    text,
    userId,
    tweetId
 });
 res.status(201).json({
    status: "success",
    data: {
        comment
    }
 })
}

export {createComment}
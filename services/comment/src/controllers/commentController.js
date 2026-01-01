import Comment from "../models/commentModel";


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
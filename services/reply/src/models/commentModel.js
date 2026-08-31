import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  userId: {
    type : String,
     required : [true, "a  user must have a user id"],
  },
  tweetId: {
    type: String,
    required : [true, "a commnet mush have a tweet id"]
  },
  /*
   tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    require: [true, "a reply tweet must belong to a tweet"],
  },
  */
  text: {
    type: String,
    //required: [true, "a tweet must have a text"],
    maxlength: [500, "a tweet must have less or equal than 500 characters"],
    minlength: [1, "a tweet must have more or equal than 1 character"],
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likesQuantity: {
    type: Number,
    default: 0,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

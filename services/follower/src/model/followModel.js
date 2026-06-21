import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
 followerId:{
    type: String,
    required : [true, "a follower must have a userId"],
  },
  followingId: {
    type: String,
    required : [true, "a following must have a tweetId"]
  },
  createdAt: {
    type: Date,
  }
})

const Follow = mongoose.model('Follow', followSchema);
export default Follow;
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
 userId:{
    type: String,
    required : [true, "a like must have a userId"],
  },
  tweetId: {
    type: String,
    required : [true, "a like must have a tweetId"]
  }
})

const Like = mongoose.model('Like', likeSchema);
export default Like;
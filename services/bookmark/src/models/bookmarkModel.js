import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId:{
     type: String,
     required : [true, "a like must have a userId"],
    },
    tweetId:{
     type: String,
     required : [true, "a like must have a tweetId"]
    }
})

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
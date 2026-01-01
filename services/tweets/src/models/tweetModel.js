//const mongoose = require("mongoose");
import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  text: {
    type: String,
    required: [true, "a tweet must have a text"],
    maxlength: [500, "a tweet must have less or equal than 500 characters"],
    minlength: [1, "a tweet must have more or equal than 1 character"],
  },
  userId:{
    type: String,
    required : [true, "a tweet must have a userId"],
  },
  name:{
    type: String,
  },
  profilePic:{
    type: String
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;

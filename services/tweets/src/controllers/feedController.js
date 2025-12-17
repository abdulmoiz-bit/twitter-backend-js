//const {client} = require("../services/client");
//const Tweet = require("../models/tweetModel");
import {client} from "../services/client.js"
import Tweet from "../models/tweetModel.js"

const getHomeFeed = async (req, res) => {
  const userId = req.user.id;

  const tweetIds = await client.lRange(`feed:${userId}`, 0, 50);

  // then fetch tweets from DB
  const tweets = await Tweet.find({ id: { $in: tweetIds } });

  res.json(tweets);
};

export {getHomeFeed}

import axios from 'axios';

const TWEET_SERVICE_URL = process.env.TWEET_SERVICE_URL || 'http://tweet:5003';

const getTweetsByUserId = async (userId) => {
  const response = await axios.get(`${TWEET_SERVICE_URL}/api/v1/tweets/${userId}`);
  return response.data
}

export {getTweetsByUserId}
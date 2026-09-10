import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user:5002';
const TWEET_SERVICE_URL = process.env.TWEET_SERVICE_URL || 'http://tweet:5003';

export const getUserById = async(userId) => {
    const response = await axios.get(`${USER_SERVICE_URL}/api/v1/users/${userId}`)
    return response.data.data;
}


/*
export const incrementFollowersCount = async (userId) => {
  await axios.patch(
    `${USER_SERVICE_URL}/api/v1/users/${userId}/increment-followers`
  );
};

export const decrementFollowersCount = async (userId) => {
  await axios.patch(
    `${USER_SERVICE_URL}/api/v1/users/${userId}/decreament-followers`
  );
};
*/

/*
export const toggleLikeCount = async (userId) => {
  await axios.patch(
    `${TWEET_SERVICE_URL}/api/v1/tweets/${tweetId}/toggle-like-count`
  );
};
*/

export const syncLikeCount = async (tweetId, action) => {
  await axios.patch(
    `${TWEET_SERVICE_URL}/api/v1/tweets/${tweetId}/toggle-like-count`,
    { action },
    { timeout: 5000 }
  );
};
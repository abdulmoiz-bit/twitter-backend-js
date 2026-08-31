import axios from 'axios';


export const getUserById = async(userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}`)
    return response.data.data;
}


/*
export const incrementFollowersCount = async (userId) => {
  await axios.patch(
    `http://localhost:5002/api/v1/users/${userId}/increment-followers`
  );
};

export const decrementFollowersCount = async (userId) => {
  await axios.patch(
    `http://localhost:5002/api/v1/users/${userId}/decreament-followers`
  );
};
*/

/*
export const toggleLikeCount = async (userId) => {
  await axios.patch(
    `http://localhost:5003/api/v1/tweets/${tweetId}/toggle-like-count`
  );
};
*/

//const TWEET_SERVICE_URL = process.env.TWEET_SERVICE_URL || "http://localhost:5003";

export const syncLikeCount = async (tweetId, action) => {
  await axios.patch(
    `http://localhost:5003/api/v1/tweets/${tweetId}/toggle-like-count`,
    { action },
    { timeout: 5000 }
  );
};
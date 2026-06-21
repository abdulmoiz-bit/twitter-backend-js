import axios from 'axios';

export const getUserById = async(userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}`)
    return response.data.data;
}

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

export const incrementFollowingCount = async (userId) => {
  await axios.patch(
    `http://localhost:5002/api/v1/users/${userId}/increment-following`
  );
};

export const decrementFollowingCount = async (userId) => {
  await axios.patch(
    `http://localhost:5002/api/v1/users/${userId}/decrement-following`
  );
};
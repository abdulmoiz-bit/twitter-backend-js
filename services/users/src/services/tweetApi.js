import axios from 'axios';

const getTweetsByUserId = async (userId) => {
  const response = await axios.get(`http://localhost:5003/api/v1/tweets/${userId}`);
  return response.data
}

export {getTweetsByUserId}
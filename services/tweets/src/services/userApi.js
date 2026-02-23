import axios from 'axios';


// for tweet posting but doesn't need that
const getUserById = async (userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}`);
    return response.data;
}

// for feed generation 
const getFollowers = async(userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}/followers`);
    return response.data.followers;
}

// feed generation
const getFollowing = async (userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}/following`);
    return response.data.following;
}
export {getUserById, getFollowing, getFollowers};
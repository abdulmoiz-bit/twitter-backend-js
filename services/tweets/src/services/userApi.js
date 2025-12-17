//const axios = require('axios')
import axios from 'axios';

const getUserById = async (userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}`);
    return response.data;
}


const getFollowers = async(userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}/followers`);
    return response.data.followers;
}


const getFollowing = async (userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}/following`);
    return response.data.following;
}
export {getUserById, getFollowing, getFollowers};
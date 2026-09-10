const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user:5002';

// for feed generation 
const getFollowers = async(userId) => {
    const response = await axios.get(`${USER_SERVICE_URL}/api/v1/users/${userId}/followers`);
    return response.data.followers;
}

// for feed generation
const getFollowing = async (userId) => {
    const response = await axios.get(`${USER_SERVICE_URL}/api/v1/users/${userId}/following`);
    return response.data.following;
}
export {getFollowing, getFollowers};
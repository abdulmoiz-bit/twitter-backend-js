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
export {getFollowing, getFollowers};
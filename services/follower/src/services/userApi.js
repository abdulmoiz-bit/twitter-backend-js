import axios from 'axios';

export const getUserById = async(userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}`)
    return response.data;
}
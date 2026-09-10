import { kafka } from "./client.js";
import axios from 'axios';
//import { getFollowers } from "../services/followingApi.js";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user:5002';

const getFollowers = async(userId) => {
    const response = await axios.get(`${USER_SERVICE_URL}/api/v1/users/${userId}/followers`);
    return response.data.followers;
}

const consumer = kafka.consumer({ groupId: "email-group" });
console.log(consumer)

export async function startConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: "email", fromBegining: true });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            const event = JSON.parse(message.value.toString());
            console.log(event)
            if (event.eventType === "TWEET_CREATED") {
                const tweet = event.data;
                console.log("Received Tweet:", tweet.id);

                // Fanout write: take the users followers and push the new tweet into their feed in Redis
                const followers = await getFollowers(tweet.id);
                console.log(followers);          
            }
        }
    })
}

// feed group takes topic event
startConsumer();
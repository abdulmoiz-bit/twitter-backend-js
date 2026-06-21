import { kafka } from "./client.js";
//import { getFollowers } from "../services/followingApi.js";


const getFollowers = async(userId) => {
    const response = await axios.get(`http://localhost:5002/api/v1/users/${userId}/followers`);
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
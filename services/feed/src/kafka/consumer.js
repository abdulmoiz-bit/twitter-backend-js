import { kafka } from "./client.js";
import { client } from "../redis/client.js"
import { getFollowers } from "../services/followingApi.js";

const consumer = kafka.consumer({ groupId: "feed-group" });
console.log(consumer)

export async function startConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: "feed", fromBegining: true });

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
                for(const followerId of followers){
                    await client.lPush(`feed:${followerId}`, tweet.id);
                    await client.lTrim(`feed:${followerId}`, 0, 49); // keep only latest 50 tweets in feed
                }
                console.log("tweet pushed to followers feed in redis")
            }
        }
    })
}

// feed group takes topic event
startConsumer();
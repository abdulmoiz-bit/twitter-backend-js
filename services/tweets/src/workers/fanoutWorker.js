import {client} from "../services/client.js"

async function startFanoutWorker() {
  console.log("Fanout Worker Started...");

  let lastId = "0-0";

  while (true) {
    const response = await client.xRead(
      {
        key: "new_tweets_stream",
        id: lastId
      },
      {
        BLOCK: 5000,
        COUNT: 10
      }
    );

    if (response) {
      for (let msg of response[0].messages) {
        const id = msg.id;
        const { tweetId, authorId } = msg.message;

        await processTweetEvent(tweetId, authorId);

        lastId = id;
      }
    }
  }
}

module.exports = { startFanoutWorker };

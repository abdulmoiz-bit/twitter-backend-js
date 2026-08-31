// This file is meant to run as its own process:  npm run worker
// Keeping it separate from the WebSocket server means you can scale
// storage/consumer throughput independently of socket connections.

const { kafka } = require('../config/kafka');
const { KAFKA_TOPIC_MESSAGES, KAFKA_CONSUMER_GROUP, REDIS_DELIVERY_CHANNEL } = require('../config/env');
const { connectMongo } = require('../config/mongo');
const { createRedisClient } = require('../config/redis');
const Message = require('../models/Message');

const consumer = kafka.consumer({ groupId: KAFKA_CONSUMER_GROUP });
const redisPublisher = createRedisClient('redis:worker-publisher');

async function start() {
  await connectMongo();
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC_MESSAGES, fromBeginning: false });

  console.log('[kafka:consumer] subscribed to', KAFKA_TOPIC_MESSAGES);

  await consumer.run({
    eachMessage: async ({ message }) => {
      let payload;
      try {
        payload = JSON.parse(message.value.toString());
      } catch (err) {
        console.error('[kafka:consumer] bad message payload, skipping', err.message);
        return;
      }

      try {
        // Persist first - this is our durability guarantee.
        // messageId is unique, so re-processing the same event (e.g. after a
        // consumer restart / rebalance) safely no-ops instead of duplicating.
        const saved = await Message.findOneAndUpdate(
          { messageId: payload.messageId },
          { $setOnInsert: { ...payload, status: 'sent' } },
          { upsert: true, new: true }
        );

        // Then hand it off for realtime delivery. Any WebSocket instance
        // subscribed to this channel will push it to the recipient if
        // they're connected locally.
        await redisPublisher.publish(
          REDIS_DELIVERY_CHANNEL,
          JSON.stringify({
            messageId: saved.messageId,
            conversationId: saved.conversationId,
            from: saved.from,
            to: saved.to,
            content: saved.content,
            status: saved.status,
            createdAt: saved.createdAt,
          })
        );
      } catch (err) {
        console.error('[kafka:consumer] failed to process message:', err.message);
        // In production, route this to a dead-letter topic instead of dropping it.
      }
    },
  });
}

start().catch((err) => {
  console.error('[kafka:consumer] fatal error, exiting:', err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  await consumer.disconnect();
  process.exit(0);
});

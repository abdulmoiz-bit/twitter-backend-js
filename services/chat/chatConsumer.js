import { getConsumer, CHAT_TOPIC } from '../config/kafka.js';
import { pubClient, DELIVERY_CHANNEL } from '../config/redis.js';
import Message from '../models/message.model.js';

// This can run in the same process as the socket server, or as its own
// deployed worker — it only depends on Kafka, Mongo, and Redis, never on
// the `io` instance directly. That's what makes it safe to scale out
// separately from your socket servers later.
export const startChatConsumer = async () => {
  const consumer = getConsumer('chat-persist-group');
  await consumer.connect();
  await consumer.subscribe({ topic: CHAT_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());

      const saved = await Message.create({
        conversationId: payload.conversationId,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        content: payload.content,
      });

      await pubClient.publish(
        DELIVERY_CHANNEL,
        JSON.stringify({
          _id: saved._id,
          conversationId: saved.conversationId,
          senderId: saved.senderId,
          receiverId: saved.receiverId,
          content: saved.content,
          createdAt: saved.createdAt,
        })
      );
    },
  });

  console.log('Chat Kafka consumer running');
};

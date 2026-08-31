import { producer, CHAT_TOPIC } from '../config/kafka.js';
import Message from '../models/message.model.js';
import { buildConversationId } from '../utils/conversationId.js';

// Called from the socket layer when a client sends a message. This does NOT
// touch Mongo directly — it hands off to Kafka and returns immediately.
// The Kafka consumer (consumers/chatConsumer.js) is what actually persists it.
export const publishMessage = async ({ senderId, receiverId, content }) => {
  const conversationId = buildConversationId(senderId, receiverId);

  const payload = {
    conversationId,
    senderId,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
  };

  await producer.send({
    topic: CHAT_TOPIC,
    // keying by conversationId guarantees all messages between the same
    // two users land in the same partition, so Kafka preserves order for them
    messages: [{ key: conversationId, value: JSON.stringify(payload) }],
  });

  return payload;
};

export const getConversationHistory = async (userA, userB, { limit = 30, before } = {}) => {
  const conversationId = buildConversationId(userA, userB);
  const query = { conversationId };
  if (before) query.createdAt = { $lt: new Date(before) };

  return Message.find(query).sort({ createdAt: -1 }).limit(limit).lean();
};

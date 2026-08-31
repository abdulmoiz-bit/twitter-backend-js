const { kafka } = require('../config/kafka');
const { KAFKA_TOPIC_MESSAGES } = require('../config/env');

const producer = kafka.producer({ allowAutoTopicCreation: true });
let connected = false;

async function connectProducer() {
  if (connected) return;
  await producer.connect();
  connected = true;
  console.log('[kafka:producer] connected');
}

// key = conversationId so all messages of the same conversation
// land on the same partition and stay in order.
async function publishMessage(message) {
  await producer.send({
    topic: KAFKA_TOPIC_MESSAGES,
    messages: [
      {
        key: message.conversationId,
        value: JSON.stringify(message),
      },
    ],
  });
}

async function disconnectProducer() {
  if (!connected) return;
  await producer.disconnect();
  connected = false;
}

module.exports = { connectProducer, publishMessage, disconnectProducer };

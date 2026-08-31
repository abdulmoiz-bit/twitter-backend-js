import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'chat-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();

export const getConsumer = (groupId) => kafka.consumer({ groupId });

export const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka producer connected');
};

export const CHAT_TOPIC = 'chat-messages';

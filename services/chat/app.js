import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { connectRedis } from './config/redis.js';
import { connectProducer } from './config/kafka.js';
import { initChatSocket } from './sockets/index.js';
import { startChatConsumer } from './consumers/chatConsumer.js';
import messageRoutes from './routes/message.routes.js';

const app = express();
app.use(express.json());

// Matches your existing route convention across the app
app.use('/api/v1/users/:userId/messages', messageRoutes);

const httpServer = http.createServer(app);

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await connectRedis();
  await connectProducer();
  await initChatSocket(httpServer);

  // Fine to run in-process for now. When you actually need to scale the
  // consumer independently of your socket servers, pull this into its own
  // deployed process/container — nothing else in this file needs to change.
  await startChatConsumer();

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => console.log(`Chat service running on ${PORT}`));
};

start().catch((err) => {
  console.error('Failed to start chat service', err);
  process.exit(1);
});

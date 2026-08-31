import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Two separate connections: Redis can't PUBLISH and SUBSCRIBE on the same
// connection once it's in subscriber mode.
export const pubClient = createClient({ url: REDIS_URL });
export const subClient = pubClient.duplicate();

pubClient.on('error', (err) => console.error('Redis pub client error', err));
subClient.on('error', (err) => console.error('Redis sub client error', err));

export const connectRedis = async () => {
  await pubClient.connect();
  await subClient.connect();
  console.log('Redis pub/sub clients connected');
};

// Single shared channel. Every chat-server instance subscribes to this once
// at startup. Each instance checks its own in-memory map of connected users
// and only emits to sockets it actually owns. This is enough for moderate
// scale; if you outgrow it later, shard by e.g. hashing userId into N channels
// instead of rewriting the whole flow.
export const DELIVERY_CHANNEL = 'chat:delivery';

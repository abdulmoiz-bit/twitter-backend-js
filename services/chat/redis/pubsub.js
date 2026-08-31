const { createRedisClient } = require('../config/redis');
const { REDIS_DELIVERY_CHANNEL } = require('../config/env');

// Every WebSocket server instance runs its own subscriber and receives
// EVERY delivered message, regardless of which instance the sender was on.
// Each instance then only emits to sockets it actually holds locally.
// This is the simplest correct fan-out; once you outgrow it, swap in the
// socket.io-redis adapter or a presence registry to target only the
// instance that holds the recipient.
function subscribeToDeliveries(onMessage) {
  const subscriber = createRedisClient('redis:subscriber');

  subscriber.subscribe(REDIS_DELIVERY_CHANNEL, (err) => {
    if (err) {
      console.error('[redis:subscriber] failed to subscribe:', err.message);
      return;
    }
    console.log('[redis:subscriber] subscribed to', REDIS_DELIVERY_CHANNEL);
  });

  subscriber.on('message', (_channel, raw) => {
    try {
      const payload = JSON.parse(raw);
      onMessage(payload);
    } catch (err) {
      console.error('[redis:subscriber] bad payload:', err.message);
    }
  });

  return subscriber;
}

module.exports = { subscribeToDeliveries };

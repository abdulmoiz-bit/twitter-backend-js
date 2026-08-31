import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { subClient, DELIVERY_CHANNEL } from '../config/redis.js';
import { publishMessage } from '../services/message.service.js';

let io;

// userId (string) -> Set of socket.id belonging to sockets CONNECTED TO THIS
// PROCESS ONLY. This is why the Redis pub/sub step exists: instance A can't
// see instance B's local map, so it needs the delivery channel to know
// "does someone here own this receiverId?"
const localUsers = new Map();

const authenticateSocket = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Unauthorized: no token'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId.toString();
    next();
  } catch (err) {
    next(new Error('Unauthorized'));
  }
};

const addLocalUser = (userId, socketId) => {
  if (!localUsers.has(userId)) localUsers.set(userId, new Set());
  localUsers.get(userId).add(socketId);
};

const removeLocalUser = (userId, socketId) => {
  const set = localUsers.get(userId);
  if (!set) return;
  set.delete(socketId);
  if (set.size === 0) localUsers.delete(userId);
};

const deliverToLocalUser = (receiverId, message) => {
  const socketIds = localUsers.get(receiverId.toString());
  if (!socketIds || socketIds.size === 0) return; // not connected to this instance
  socketIds.forEach((id) => io.to(id).emit('new_message', message));
};

export const initChatSocket = async (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_ORIGIN || '*' },
  });

  io.use(authenticateSocket);

  // One subscription per process, done once at startup — not per user.
  await subClient.subscribe(DELIVERY_CHANNEL, (raw) => {
    const message = JSON.parse(raw);
    deliverToLocalUser(message.receiverId, message);
  });

  io.on('connection', (socket) => {
    const { userId } = socket;
    addLocalUser(userId, socket.id);

    // No "follow" requirement — any authenticated user can message any other
    // authenticated user. Nothing to check here beyond auth having passed.
    socket.on('send_message', async ({ receiverId, content }) => {
      if (!receiverId || !content?.trim()) {
        return socket.emit('message_error', { error: 'receiverId and content are required' });
      }
      try {
        const message = await publishMessage({ senderId: userId, receiverId, content });
        // optimistic ack to the sender — NOT the final "delivered" event,
        // just "Kafka has it and it will be persisted"
        socket.emit('message_sent_ack', message);
      } catch (err) {
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      removeLocalUser(userId, socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized yet');
  return io;
};

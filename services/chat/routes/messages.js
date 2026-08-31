import { Router } from 'express';
import { getHistory } from '../controllers/message.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js'; // your existing auth middleware

const router = Router({ mergeParams: true });

// GET /api/v1/users/:userId/messages -> conversation history only.
// Sending happens over the socket ('send_message' event), not here.
router.get('/', authenticate, getHistory);

export default router;

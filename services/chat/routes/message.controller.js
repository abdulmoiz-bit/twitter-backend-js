import { getConversationHistory } from '../services/message.service.js';

// GET /api/v1/users/:userId/messages
// :userId here is the OTHER participant in the conversation, req.user is the
// authenticated caller (from your existing auth middleware).
export const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    const { limit, before } = req.query;

    const messages = await getConversationHistory(currentUserId, userId, {
      limit: Number(limit) || 30,
      before,
    });

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

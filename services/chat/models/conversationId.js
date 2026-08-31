// No follow relationship is required between users to chat -
// any two userIds can produce a valid, deterministic conversationId.
function buildConversationId(userIdA, userIdB) {
  return [String(userIdA), String(userIdB)].sort().join('_');
}

module.exports = { buildConversationId };

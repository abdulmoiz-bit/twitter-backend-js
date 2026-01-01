import express from 'express';

const router = express.Router();

router.post("/", retweetTarget);

export default router;
import express from 'express';
import { likeTarget } from '../controllers/likeController.js';

const router = express.Router();

router.post("/:tweetId", likeTarget)

export default router;
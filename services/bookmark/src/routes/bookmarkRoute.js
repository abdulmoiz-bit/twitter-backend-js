import express from 'express';
import { addBookmark } from '../controllers/bookmarkController';


const router = express.Router();

router.post("/:tweetId", addBookmark)

export default router;
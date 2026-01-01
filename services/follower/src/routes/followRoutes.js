import express from "express";
import { toggleFollow } from "../controllers/followController.js";

const router = express.Router();
router.post("/:id", toggleFollow)

export default router;
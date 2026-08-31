import express from "express";
import { toggleFollow } from "../controllers/followController.js";
import protect from "../middlewares/auth.js";

const router = express.Router();
router.post("/:id", protect, toggleFollow);

export default router;
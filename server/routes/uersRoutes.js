import express from 'express';
import { getUserPosts } from '../controllers/userController.js';

const router = express.Router();

router.post("/", getUserPosts);

export default router;
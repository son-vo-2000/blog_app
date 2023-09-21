import express from 'express';
import {getAllPost, deletePost, updatePost, createNewPost, getPostById} from '../controllers/postController.js'

const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getPostById);
router.post("/", createNewPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);



export default router
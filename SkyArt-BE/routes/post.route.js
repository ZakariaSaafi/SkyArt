import { Router } from "express";
import {
    addPost,
    updatePost,
    getPosts,
    deletePost,
    getPostById,
    getPostsByOwnerId
} from "../controllers/post.controller.js";

const router = Router();

router.route("/")
.get(getPosts)
.post(addPost)

router.route("/:id")
.delete(deletePost)
.patch(updatePost)
.get(getPostById)

router.route("/owner/:ownerId")
.get(getPostsByOwnerId)

export default router;
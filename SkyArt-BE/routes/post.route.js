import { Router } from "express";
import { addPost, updatePost, getPosts, deletePost} from "../controllers/post.controller.js";

const router = Router();

router.route("/")
.get(getPosts)
.post(addPost)
.patch(updatePost)
.delete(deletePost)
//router.route("/:id")
export default router;
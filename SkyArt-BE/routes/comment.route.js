import { Router } from "express";
import {addComment, deleteComment, getComments, updateComment} from "../controllers/comment.controller.js";


const router = Router();

router.route("/")
    .get(getComments)
    .post(addComment)

router.route("/:id")
.delete(deleteComment)
.patch(updateComment)

export default router;
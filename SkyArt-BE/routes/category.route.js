import { Router } from "express";
import {
    addCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory
} from "../controllers/category.controller.js";
import {getPostById} from "../controllers/post.controller.js";

const router = Router();

router.route("/")
    .get(getCategories)
    .post(addCategory)

router.route("/:id")
.delete(deleteCategory)
.patch(updateCategory)
.get(getCategoryById)

export default router;
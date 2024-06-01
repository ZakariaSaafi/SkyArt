import { Router } from "express";
import {addCategory, deleteCategory, getCategories, updateCategory} from "../controllers/category.controller.js";

const router = Router();

router.route("/")
    .get(getCategories)
    .post(addCategory)

router.route("/:id")
.delete(deleteCategory)
.patch(updateCategory)

export default router;
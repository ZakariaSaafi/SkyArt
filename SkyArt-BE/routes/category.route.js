import { Router } from "express";
import {addCategory, deleteCategory, getCategories, updateCategory} from "../controllers/category.controller.js";

const router = Router();

router.route("/")
    .get(getCategories)
    .post(addCategory)
    .patch(updateCategory)
    .delete(deleteCategory)
//router.route("/:id")
export default router;
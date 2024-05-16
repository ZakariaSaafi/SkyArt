import { Router } from "express";
import { addPost } from "../controllers/post.controller.js";

const router = Router();


router.post("/addPost", addPost);
    
router.post("/updatePost",
    
)

router.post("/deletePost",
    
)

router.post("/displayPost",
    
)

export default router;
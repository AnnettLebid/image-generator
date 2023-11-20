import express from "express";
import { createPost, getPosts } from "../controllers/posts.js";

const router = express.Router();

router.route("/").post(createPost).get(getPosts);

export default router;

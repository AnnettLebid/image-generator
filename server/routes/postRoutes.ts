import express from "express";
import * as dotenv from "dotenv";
import { createPost, getAllPosts } from "../controllers/post.js";

dotenv.config();

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);

export default router;

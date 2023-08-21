import express from "express";
import { createPost } from "../controllers/dalle.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from dalle");
});

router.route("/").post(createPost);

export default router;

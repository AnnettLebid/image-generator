import express from "express";
import { generateImage } from "../controllers/dalle.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from dalle");
});

router.route("/").post(generateImage);

export default router;

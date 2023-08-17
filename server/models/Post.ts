import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: Number, required: true },
});

export const Post = mongoose.model("Post", PostSchema);

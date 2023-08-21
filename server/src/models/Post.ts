import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photoUrl: { type: String, required: true },
});

export const Post = mongoose.model("Post", PostSchema);

import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "../models/Post.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPost = async (req: Request, res: Response) => {
  try {
    const { name, prompt, photo } = req.body;

    const { url: photoUrl } = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({ name, prompt, photoUrl });

    res.status(StatusCodes.CREATED).json(newPost);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || "1");
  const pageSize = parseInt((req.query.pageSize as string) || "10");
  const skip = (page - 1) * pageSize;
  try {
    const posts = await Post.find().skip(skip).limit(pageSize);    
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error });
  }
};

import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const createPost = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(StatusCodes.BAD_REQUEST).send("Prompt is required");
  }

  try {
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;

    res.status(StatusCodes.CREATED).json({ photo: image });
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.response.data);
  }
};

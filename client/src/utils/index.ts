import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";
import axios from "axios";

export function getRandomPrompt(prompt: string): string {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (prompt === randomPrompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id: string, photoUrl: string) {
  FileSaver.saveAs(photoUrl, `${_id}.png`);
}

export async function getPosts(url: string, page: number, limit = 10) {
  try {
    const response = await axios.get(`${url}?page=${page}&limit=${limit}`);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

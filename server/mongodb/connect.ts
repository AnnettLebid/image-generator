import mongoose from "mongoose";

export const connectDB = (url: string) => {
  mongoose.set("strictQuery", true);
  return mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

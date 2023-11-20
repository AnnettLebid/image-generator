import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

const startServer = async () => {
  try {
    await connectDB(`mongodb+srv://${process.env.MONGO_URI}`);
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

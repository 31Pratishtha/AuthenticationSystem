import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({ path: "../.env" });
const app = express();

const corsOptions = {
  origin: [
    "https://authentication-system-frontend.vercel.app",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api", (req, res) => {
  console.log("Hello World");
  res.status(200).send("Hello World");
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL;

app.listen(`${port}`, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(`${mongodbUrl}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("connection to MongoDB failed ! ", err);
  });

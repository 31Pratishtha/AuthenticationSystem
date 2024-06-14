import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const app = express();

app.use(cors({ origin: ['https://authentication-system-frontend.vercel.app', 'http://localhost:5173', 'http://localhost:4173'] }));
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

app.listen(`${port}`, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://Pratishtha:MongoDBpswd@backenddb.kn00wnx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("connection to MongoDB failed ! ", err);
  });

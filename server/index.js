import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect(process.env.DATABASE_URL, () =>
  console.log("Database Connected")
);

app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(PORT, () => console.log("Server is running on port" + PORT));

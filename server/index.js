import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect(
  "mongodb+srv://Mislavko:Mislavko@cluster0.rgjex9w.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Database Connected")
);

app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(PORT, () => console.log("Server is running on port" + PORT));

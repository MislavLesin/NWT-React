import express from "express";
import model from "../models/postModel.js";

const router = express.Router();

router.get("/posts", async (request, response) => {
  try {
    const users = await model.find();
    response.status(200).json(users);
  } catch {
    (error) => {
      response.status(404).json({ message: error.message });
    };
  }
});

router.post("/posts", (request, response) => {
  const newPost = new model({
    username: request.body.username,
    message: request.body.message,
    tags: request.body.tags,
  });
  console.log(newPost);
  newPost
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error.response.data);
    });
});

export default router;

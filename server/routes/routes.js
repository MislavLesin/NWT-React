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

router.delete("/posts/:id", async (req, res) => {
  await model.findByIdAndDelete(req.params.id);
  res.json("Success");
});

router.put("/posts/:id", async (req, res) => {
  await model.findOneAndUpdate(
    { _id: req.params.id },
    new model({
      _id: req.params.id,
      username: req.body.username,
      message: req.body.message,
      tags: req.body.tags,
      date: new Date(),
    }),
    { new: true }
  );
  res.json("Success");
});

export default router;

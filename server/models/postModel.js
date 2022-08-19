import mongoose from "mongoose";

const postModel = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

var model = mongoose.model("nwt", postModel);
export default model;

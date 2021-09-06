import { Schema, model } from "mongoose";

const newsModel = Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbNail: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    ref: "User"
  },
  timestamp: {
    type: Date,
    required: true
  },
  location: {
    type: map,
    required: true
  },
  sharecount: {
    type: map,
    required: true
  },
  approved: {
    type: [String],
    ref: "User"
  },
  denied: {
    type: [String],
    ref: "User"
  },
  Idk: {
    type: [String],
    ref: "User"
  },
  category: {
    type: String
  }
});

const news = model("News", newsModel);

export default news;

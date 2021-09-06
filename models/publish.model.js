import { Schema, model } from "mongoose";

const publishModel = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  timestamp: {
    type: Date,
    required: true,
  },
  location: {
    type: Map,
    required: true,
  },
  sharecount: {
    type: Map,
    required: true,
  },
  approved: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  denied: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  idk: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: String,
  },
});

const Published = model("Published", publishModel);

export default Published;

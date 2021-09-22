import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sandboxmodel = Schema({
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
  sendcount: {
    type: Number,
    default: 0,
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
    required: true,
  },
});

const sandbox = mongoose.model("Sandbox", sandboxmodel);

export default sandbox;

import { Schema, model } from "mongoose";

const sandboxModel = Schema({
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  timestamp: {
    type: Date,
    required: true
  },
  location: {
    type: Map,
    required: true
  },
  sharecount: {
    type: Map,
    required: true
  },
  approved: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  denied: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  Idk: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  category: {
    type: String
  }
});

const sandbox = model("Sandbox", sandboxModel);

export default sandbox;

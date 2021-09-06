import { Schema, model } from "mongoose";

const userModel = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    maxLength: 120,
  },
  password: {
    type: String,
    minLength: 8,
  },
  avatar: {
    type: String,
  },
  deviceid: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ["Andriod", "IOS"],
    required: true,
  },
  home_location: {
    type: Map,
  },
  current_location: {
    type: Map,
  },
  last_active: {
    type: Date,
  },
  score: {
    type: Number,
    default: 0,
  },
  published: [
    {
      type: Schema.Types.ObjectId,
      ref: "Published",
    },
  ],
});

const user = model("User", userModel);

export default user;

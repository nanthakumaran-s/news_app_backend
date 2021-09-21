import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userModel = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    maxLength: 120,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: "https://return201-s3.me/uploads/avatars/default.png",
  },
  deviceid: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
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
  isdeleted: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "en",
    required: true,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Published",
    },
  ],
  isblocked: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.model("User", userModel);

export default user;

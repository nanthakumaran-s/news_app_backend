import mongoose from "mongoose";
import Mongoosastic from "mongoosastic";

const Schema = mongoose.Schema;

const publishModel = Schema({
  title: {
    type: String,
    required: true,
    es_indexed: true,
  },
  content: {
    type: String,
    required: true,
    es_indexed: true,
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
  isblock: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
    es_indexed: true,
  },
  report: {
    type: Number,
    default: 0,
  },
});

publishModel.plugin(Mongoosastic, {
  host: "elasticsearch",
  port: 9200,
});

const Published = mongoose.model("Published", publishModel);

Published.createMapping(function (err, mapping) {
  if (err) {
    console.log("error creating mapping (you can safely ignore this)");
    console.log(err);
  } else {
    console.log("mapping created!");
  }
});

export default Published;

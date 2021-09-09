import mongoose from "mongoose";
import Mongoosastic from "mongoosastic";

const Schema = mongoose.Schema;

const sandboxmodel = Schema({
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
  idk: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: String,
    required: true,
    es_indexed: true,
  },
});

sandboxmodel.plugin(Mongoosastic, {
  host: "elasticsearch",
  port: 9200,
});

const sandbox = mongoose.model("Sandbox", sandboxmodel);

sandbox.createMapping(function (err, mapping) {
  if (err) {
    console.log("error creating mapping (you can safely ignore this)");
    console.log(err);
  } else {
    console.log("mapping created!");
  }
});

export default sandbox;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fs from "fs";
import rootDir from "../utils/path.js";
import path from "path";

// middlewares
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import { client } from "./middleware/redis.js";
import fileUpload from "express-fileupload";

import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(fileUpload());
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: fs.createWriteStream(path.join(rootDir, "logs/", "auth.log")),
  })
);

app.use("/", routes);

client.on("error", (err) => {
  console.error(err);
});

export default app;

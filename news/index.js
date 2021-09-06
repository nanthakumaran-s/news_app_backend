import express from "express";
import dotenv from "dotenv";

import fs from "fs";
import path from "path";
import rootDir from "../utils/path.js";

// middlewares
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import routes from "./routes/index.js";

dotenv.config();

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
    stream: fs.createWriteStream(path.join(rootDir, "logs/", "news.log")),
  })
);

app.use("/", routes);
export default app;

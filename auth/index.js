import express from "express";
import dotenv from "dotenv";

import fs from "fs";
import rootDir from "../utils/path.js";
import path from "path";

// middlewares
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: fs.writeFile(path.join(rootDir, "logs/", "auth.log")),
  })
);

app.use("/", routes);
export default app;

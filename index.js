import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";

// middlewares
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

//subapps
import auth from "./auth/index.js";
import news from "./news/index.js";
import utils from "./electron/index.js";
import { loadnsfwModel, loadtoxityModel } from "./utils/tfmodels.js";

//check
let i = 0;

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  i++;
  res.send(`${i} time`);
});

app.use("/api/auth", auth);
app.use("/api/news", news);
app.use("/api/utils", utils);

mongoose
  .connect(
    "mongodb+srv://sanjai:popzz@cluster0.owrbj.mongodb.net/news?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    loadtoxityModel();
    loadnsfwModel();
    server.listen(PORT, () => {
      console.log(`Server listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

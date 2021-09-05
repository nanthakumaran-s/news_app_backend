import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";

// middlewares
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

//subapps
// import auth from "./auth/index.js";

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

app.get("/", (req, res) => {
  res.send("It's running!!!!");
});

// app.use("/auth", auth);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

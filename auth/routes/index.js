import express from "express";
import v1 from "./v1/routes.js";

const router = express.Router();

// define routers
router.use("/v1", v1);

export default router;

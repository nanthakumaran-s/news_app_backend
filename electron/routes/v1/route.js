import express from "express";
const router = express.Router();

import autocorrect from "../../controller/autocorrect.controller.js";

router.get("/autocorrect", autocorrect);

export default router;

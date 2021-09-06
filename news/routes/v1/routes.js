import express from "express";
const router = express.Router();

//import controllers
import Postnews from "../../controllers/postnews.controller.js";
import GetNewsById from "../../controllers/getnews-id.controller.js";
import GetNewsByLocation from "../../controllers/getnews-location.controller.js";

// routes
router.post("/postnews", Postnews);
router.get("/getnews-id", GetNewsById);
router.get("/getnews-location", GetNewsByLocation);

export default router;

import express from "express";
const router = express.Router();

//import controllers
import Postnews from "../../controllers/postnews.js";
import GetNewsById from "../../controllers/getnews-id.js";
import GetNewsByLocation from "../../controllers/getnews-location.js";

// routes
router.post("/postnews", Postnews);
router.get("/getnews-id", GetNewsById);
router.get("/getnews-location", GetNewsByLocation);

export default router;
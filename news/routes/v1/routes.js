import express from "express";
const router = express.Router();

//import controllers
import Postnews from "../../controllers/postnews.js";

// define routers
router.post("/postnews", Postnews); //postnews

//create getnews......

export default router;

import express from "express";
const router = express.Router();

//import controllers
import Postnews from "../../controllers/postnews.controller.js";
import GetNewsById from "../../controllers/getnews-id.controller.js";
import GetNewsByLocation from "../../controllers/getnews-location.controller.js";
import GetNewsByLatLong from "../../controllers/getnews-latlong.controller.js";
import UpdateShareCount from "../../controllers/update-sharecount.controller.js";
import Approve from "../../controllers/approve.controller.js";
import Deny from "../../controllers/deny.controller.js";
import IDK from "../../controllers/idk.controller.js";
import GetTrending from "../../controllers/trending.controller.js";
import Search from "../../controllers/search.controller.js";

// routes
router.post("/postnews", Postnews);
router.get("/getnews-id", GetNewsById);
router.get("/getnews-location", GetNewsByLocation);
router.get("/getnews-latlong", GetNewsByLatLong);
router.patch("/update-sharecount", UpdateShareCount);
router.get("/getnews-trending", GetTrending);
router.patch("/approve", Approve);
router.patch("/deny", Deny);
router.patch("/idk", IDK);
router.get("/search", Search);



export default router;

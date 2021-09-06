import express from "express";
const router = express.Router();

//import controllers
import signup from "../../controllers/signup.controller.js";
import signin from "../../controllers/signin.controller.js";
import deleteuser from "../../controllers/delete.controller.js";
import isUsername from "../../controllers/username.controller.js";
import changelocation from "../../controllers/changelocation.controller.js";
import updateprofile from "../../controllers/update.controller.js";

// define routers
router.post("/signup", signup);
router.get("/signin", signin);
router.delete("/delete-user", deleteuser);
router.get("/isusername-available", isUsername);
router.patch("/change-location", changelocation);
router.put("/update-profile", updateprofile);

export default router;
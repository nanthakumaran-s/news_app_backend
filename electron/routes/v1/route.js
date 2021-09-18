import express from "express";
const router = express.Router();

import autocorrect from "../../controllers/autocorrect.controller.js";
// bookmarks controllers
import getbookmarks from "../../controllers/bookmarks/getbookmarks.controller.js";
import deletebookmarks from "../../controllers/bookmarks/deletebookmarks.controller.js";
import createbookmarks from "../../controllers/bookmarks/createbookmarks.controller.js";

router.get("/autocorrect", autocorrect);

/* bookmarks */
router.patch("/createbookmark", createbookmarks);
router.get("/getbookmarks", getbookmarks);
router.delete("/deletebookmark", deletebookmarks);

export default router;

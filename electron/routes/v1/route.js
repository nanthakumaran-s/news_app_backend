import express from "express";
const router = express.Router();

import autocorrect from "../../controllers/autocorrect.controller.js";
// bookmarks controllers
import getbookmarks from "../../controllers/bookmarks/getbookmarks.controller.js";
import deletebookmarks from "../../controllers/bookmarks/deletebookmarks.controller.js";
import createbookmarks from "../../controllers/bookmarks/createbookmarks.controller.js";
// Categories
import getCategories from "../../controllers/categories/getcategories.controller.js";
import createCategories from "../../controllers/categories/createcategory.controller.js";
import report from "../../controllers/report.controller.js";

// blocking
import block from "../../controllers/block.controller.js"
import unblock from "../../controllers/unblock.controller.js";
router.get("/autocorrect", autocorrect);

/* bookmarks */
router.patch("/createbookmark", createbookmarks);
router.get("/getbookmarks", getbookmarks);
router.delete("/deletebookmark", deletebookmarks);

// category
router.get("/getCategory", getCategories);
router.post("/createCategory", createCategories);

// report
router.put("/report-news", report);

// block
router.patch("/block",block)
router.patch("/unblock", unblock);
export default router;

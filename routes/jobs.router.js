const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate } = require("../middleware/auth.js");
const {
    getJobStatus,
    getJobByChapter,
} = require("../controllers/jobs.controller.js");

router.get("/:id", authenticate, getJobStatus);
router.get("/by-chapter/:chapterId", authenticate, getJobByChapter);
module.exports = router;

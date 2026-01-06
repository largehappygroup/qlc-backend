const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate } = require("../middleware/auth.js");
const {
    getJobStatus,
    getJobByAssignment,
} = require("../controllers/jobs.controller.js");

router.get("/:id", authenticate, getJobStatus);
router.get("/by-assignment/:assignmentId", authenticate, getJobByAssignment);
module.exports = router;

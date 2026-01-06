const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");
const {
    getJobStatus,
    getJobByAssignment,
} = require("../controllers/jobs.controller.js");

router.get("/:id", authenticate, requireRole(["admin", "faculty"]), getJobStatus);
router.get("/by-assignment/:assignmentId", authenticate, getJobByAssignment);
module.exports = router;

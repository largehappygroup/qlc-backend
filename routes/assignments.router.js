const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    createAssignment,
    deleteAssignment,
    editAssignment,
    getAllAssignments,
    getAssignment,
} = require("../controllers/assignments.controller.js");

router.post("/", authenticate, requireRole(["admin", "faculty"]), createAssignment);
router.put("/:id", authenticate, requireRole(["admin", "faculty"]), editAssignment);
router.get("/", authenticate, getAllAssignments);
router.get("/:id", authenticate, getAssignment);
router.delete("/:id", authenticate, requireRole(["admin", "faculty"]), deleteAssignment);
module.exports = router;

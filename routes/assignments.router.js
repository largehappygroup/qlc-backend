const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    createAssignment,
    deleteAssignmentById,
    editAssignmentById,
    getAllAssignments,
    getAssignmentById,
} = require("../controllers/assignments.controller.js");

router.post("/", authenticate, requireRole(["admin", "faculty"]), createAssignment);
router.put("/:assignmentId", authenticate, requireRole(["admin", "faculty"]), editAssignmentById);
router.get("/", authenticate, getAllAssignments);
router.get("/:assignmentId", authenticate, getAssignmentById);
router.delete("/:assignmentId", authenticate, requireRole(["admin", "faculty"]), deleteAssignmentById);
module.exports = router;

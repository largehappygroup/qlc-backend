const express = require("express");
const router = express.Router({ mergeParams: true });
const {authenticate} = require("../middleware/auth.js");

const {
    createAssignment,
    deleteAssignment,
    editAssignment,
    getAllAssignments,
    getAssignment,
} = require("../controllers/assignments.controller.js");

router.post("/", authenticate, createAssignment);
router.put("/:id", authenticate, editAssignment);
router.get("/", authenticate, getAllAssignments);
router.get("/:id", authenticate, getAssignment);
router.delete("/:id", authenticate, deleteAssignment);
module.exports = router;

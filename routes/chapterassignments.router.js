const express = require("express");
const router = express.Router({ mergeParams: true });
const {authenticate} = require("../middleware/auth.js");

const {
    createChapterAssignment,
    deleteChapterAssignment,
    editChapterAssignment,
    getAllChapterAssignments,
    getChapterAssignment,
} = require("../controllers/chapterassignments.controller.js");

router.post("/", authenticate, createChapterAssignment);
router.put("/:id", authenticate, editChapterAssignment);
router.get("/", authenticate, getAllChapterAssignments);
router.get("/:id", authenticate, getChapterAssignment);
router.delete("/:id", authenticate, deleteChapterAssignment);
module.exports = router;

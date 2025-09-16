const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    createChapterAssignment,
    deleteChapterAssignment,
    editChapterAssignment,
    getAllChapterAssignments,
    getChapterAssignment,
} = require("../controllers/chapterassignments.controller.js");

router.post("/", createChapterAssignment);
router.put("/:id", editChapterAssignment);
router.get("/", getAllChapterAssignments);
router.get("/:id", getChapterAssignment);
router.delete("/:id", deleteChapterAssignment);

module.exports = router;

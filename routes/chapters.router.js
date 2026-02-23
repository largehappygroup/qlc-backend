const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    createChapter,
    deleteChapterById,
    editChapterById,
    getAllChapters,
    getChapterById,
    editAllChapters,
} = require("../controllers/chapters.controller.js");

router.post("/", authenticate, requireRole(["admin", "faculty"]), createChapter);
router.put("/", authenticate, requireRole(["admin", "faculty"]), editAllChapters);
router.put("/:chapterId", authenticate, requireRole(["admin", "faculty"]), editChapterById);
router.get("/", authenticate, getAllChapters);
router.get("/:chapterId", authenticate, getChapterById);
router.delete("/:chapterId", authenticate, requireRole(["admin", "faculty"]), deleteChapterById);

module.exports = router;

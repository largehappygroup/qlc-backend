const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    createChapter,
    deleteChapter,
    editChapter,
    getAllChapters,
    getChapter,
    editAllChapters,
} = require("../controllers/chapters.controller.js");

router.post("/", authenticate, requireRole(["admin", "faculty"]), createChapter);
router.put("/", authenticate, requireRole(["admin", "faculty"]), editAllChapters);
router.put("/:id", authenticate, requireRole(["admin", "faculty"]), editChapter);
router.get("/", authenticate, getAllChapters);
router.get("/:id", authenticate, getChapter);
router.delete("/:id", authenticate, requireRole(["admin", "faculty"]), deleteChapter);

module.exports = router;

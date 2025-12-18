const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate } = require("../middleware/auth.js");

const {
    createChapter,
    deleteChapter,
    editChapter,
    getAllChapters,
    getChapter,
    editAllChapters,
} = require("../controllers/chapters.controller.js");

router.post("/", authenticate, createChapter);
router.put("/", authenticate, editAllChapters);
router.put("/:id", authenticate, editChapter);
router.get("/", authenticate, getAllChapters);
router.get("/:id", authenticate, getChapter);
router.delete("/:id", authenticate, deleteChapter);

module.exports = router;

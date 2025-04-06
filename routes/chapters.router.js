const express = require("express");
const router = express.Router();

const {
    createChapter,
    deleteChapter,
    editChapter,
    getAllChapters,
    getChapter,
    editAllChapters,
} = require("../controllers/chapters.controller.js");

router.post("/", createChapter);
router.put("/", editAllChapters);
router.put("/:id", editChapter);
router.get("/", getAllChapters);
router.get("/:id", getChapter);
router.delete("/:id", deleteChapter);

module.exports = router;

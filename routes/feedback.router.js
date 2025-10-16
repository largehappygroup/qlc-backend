const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    createFeedback,
    downloadFeedback,
} = require("../controllers/feedback.controller.js");

router.post("/", createFeedback);
router.get("/", downloadFeedback);

module.exports = router;

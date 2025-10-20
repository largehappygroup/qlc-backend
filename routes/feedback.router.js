const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    createFeedback,
    downloadFeedback,
    doesFeedbackExist
} = require("../controllers/feedback.controller.js");

router.post("/", createFeedback);
router.get("/", downloadFeedback);
router.get("/exists", doesFeedbackExist);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate } = require("../middleware/auth.js");
const {
    createFeedback,
    downloadFeedback,
    doesFeedbackExist
} = require("../controllers/feedback.controller.js");

router.post("/", authenticate, createFeedback);
router.get("/", authenticate, downloadFeedback);
router.get("/exists", authenticate, doesFeedbackExist);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate } = require("../middleware/auth.js");

const {
    regenerateExercise,
    createExercises,
    deleteExercise,
    editExercise,
    getAllExercises,
    downloadExercises,
    getExercise,
    checkQuestion,
    getAverageScore,
    getAverageTimeSpent,
    getRecentActivity,
    submitRatings,
    getAverageScoreDistribution,
} = require("../controllers/exercises.controller.js");

router.post("/regenerate", authenticate, regenerateExercise);
router.post("/batch", authenticate, createExercises);
router.put("/:id/ratings", authenticate, submitRatings);
router.put("/:id", authenticate, editExercise);
router.get("/download", authenticate, downloadExercises);
router.get("/distribution", authenticate, getAverageScoreDistribution);
router.get("/average", authenticate, getAverageScore);
router.get("/recent-activity", authenticate, getRecentActivity);
router.get("/time-spent", authenticate, getAverageTimeSpent);
router.get("/", authenticate, getAllExercises);
router.get("/:id", authenticate, getExercise);
router.delete("/:id", authenticate, deleteExercise);
router.post("/:id/check", authenticate, checkQuestion);

module.exports = router;

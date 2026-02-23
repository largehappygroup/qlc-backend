const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    regenerateExercise,
    createExercises,
    deleteExerciseById,
    editExerciseById,
    getAllExercises,
    downloadExercises,
    getMostRecentExercise,
    checkQuestion,
    getAverageScore,
    getAverageTimeSpent,
    getRecentActivity,
    submitRatings,
    markExerciseComplete,
    getAverageScoreDistribution,
} = require("../controllers/exercises.controller.js");

router.post(
    "/regenerate",
    authenticate,
    requireRole(["admin", "faculty"]),
    regenerateExercise,
);
router.post(
    "/batch",
    authenticate,
    requireRole(["admin", "faculty"]),
    createExercises,
);
router.put("/:exerciseId/ratings", authenticate, submitRatings);
router.put(
    "/:exerciseId",
    authenticate,
    editExerciseById,
);
router.get(
    "/download",
    authenticate,
    requireRole(["admin", "faculty"]),
    downloadExercises,
);
router.get("/distribution", authenticate, getAverageScoreDistribution);
router.get("/average", authenticate, getAverageScore);
router.get("/recent-activity", authenticate, getRecentActivity);
router.get("/time-spent", authenticate, getAverageTimeSpent);
router.get("/most-recent", authenticate, getMostRecentExercise);
router.get("/", authenticate, getAllExercises);
router.delete(
    "/:exerciseId",
    authenticate,
    requireRole(["admin", "faculty"]),
    deleteExerciseById,
);
router.post("/:exerciseId/check", authenticate, checkQuestion);

module.exports = router;

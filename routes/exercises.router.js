const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    regenerateExercise,
    createExercises,
    deleteExercise,
    editExercise,
    getAllExercises,
    downloadExercises,
    getMostRecentExercise,
    checkQuestion,
    getAverageScore,
    getAverageTimeSpent,
    getRecentActivity,
    submitRatings,
    getAverageScoreDistribution,
} = require("../controllers/exercises.controller.js");

router.post("/regenerate", authenticate, requireRole(["admin", "faculty"]), regenerateExercise);
router.post("/batch", authenticate, requireRole(["admin", "faculty"]), createExercises);
router.put("/:id/ratings", authenticate, submitRatings);
router.put("/:id", authenticate, requireRole(["admin", "faculty"]), editExercise);
router.get("/download", authenticate, requireRole(["admin", "faculty"]), downloadExercises);
router.get("/distribution", authenticate, getAverageScoreDistribution);
router.get("/average", authenticate, getAverageScore);
router.get("/recent-activity", authenticate, getRecentActivity);
router.get("/time-spent", authenticate, getAverageTimeSpent);
router.get("/most-recent", authenticate, getMostRecentExercise);
router.get("/", authenticate, getAllExercises);
router.delete("/:id", authenticate, requireRole(["admin", "faculty"]), deleteExercise);
router.post("/:id/check", authenticate, checkQuestion);

module.exports = router;

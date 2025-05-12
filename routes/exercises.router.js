const express = require("express");
const router = express.Router();

const {
    createExercise,
    deleteExercise,
    editExercise,
    getAllExercises,
    downloadExercises,
    getExercise,
    checkQuestion,
    getAverageScore,
    getAverageTimeSpent,
    getRecentActivity,
} = require("../controllers/exercises.controller.js");

router.post("/", createExercise);
router.put("/:id", editExercise);
router.get("/download", downloadExercises);
router.get("/average", getAverageScore);
router.get("/recent-activity", getRecentActivity);
router.get("/time-spent", getAverageTimeSpent);
router.get("/", getAllExercises);
router.get("/:id", getExercise);
router.delete("/:id", deleteExercise);
router.post("/:id/check", checkQuestion);

module.exports = router;

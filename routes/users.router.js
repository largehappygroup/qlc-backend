const express = require("express");
const router = express.Router();

const {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    downloadUsers,
    getUser,
    getAverageScoreDistribution,
    getTotalStudents,
} = require("../controllers/users.controller.js");

router.post("/", createUser);
router.put("/:id", editUser);
router.get("/download", downloadUsers);
router.get("/total-students", getTotalStudents);
router.get("/distribution", getAverageScoreDistribution);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;

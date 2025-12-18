const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { authenticate } = require("../middleware/auth.js");

const {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    downloadUsers,
    uploadUsers,
    getUser,
    getTotalStudents,
} = require("../controllers/users.controller.js");

const upload = multer({ dest: "./uploads" });

router.post("/upload", authenticate, upload.single("file"), uploadUsers);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, editUser);
router.get("/download", authenticate, downloadUsers);
router.get("/total-students", authenticate, getTotalStudents);
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;

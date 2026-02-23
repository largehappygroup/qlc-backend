const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { authenticate, requireRole } = require("../middleware/auth.js");

const {
    createUser,
    deleteUserById,
    editUserById,
    getAllUsers,
    downloadUsers,
    uploadUsers,
    getUserById,
    getTotalStudents,
} = require("../controllers/users.controller.js");

const upload = multer({ dest: "./uploads" });

router.post(
    "/upload",
    authenticate,
    requireRole(["admin", "faculty"]),
    upload.single("file"),
    uploadUsers
);
router.post("/", authenticate, createUser);
router.put("/:userId", authenticate, requireRole(["admin", "faculty"]), editUserById);
router.get(
    "/download",
    authenticate,
    requireRole(["admin", "faculty"]),
    downloadUsers
);
router.get(
    "/total-students",
    authenticate,
    requireRole(["admin", "faculty"]),
    getTotalStudents
);
router.get("/", authenticate, requireRole(["admin", "faculty"]), getAllUsers);
router.get("/:userId", authenticate, getUserById);
router.delete(
    "/:userId",
    authenticate,
    requireRole(["admin", "faculty"]),
    deleteUserById
);
module.exports = router;

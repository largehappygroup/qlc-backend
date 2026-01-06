const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { authenticate, requireRole } = require("../middleware/auth.js");

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

router.post(
    "/upload",
    authenticate,
    requireRole(["admin", "faculty"]),
    upload.single("file"),
    uploadUsers
);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, requireRole(["admin", "faculty"]), editUser);
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
router.get("/:id", authenticate, getUser);
router.delete(
    "/:id",
    authenticate,
    requireRole(["admin", "faculty"]),
    deleteUser
);
module.exports = router;

const User = require("../models/User.js");
const Exercise = require("../models/Exercise.js");
const fs = require("fs");
const csvParser = require("csv-parser");
const { Parser } = require("json2csv");
const { flatten } = require("@json2csv/transforms");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Creates a new user (registration)
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const createUser = async (req, res) => {
    try {
        // from vusso
        const email = req.headers["remote-user"];
        const firstName = req.headers["remote-user-given-name"];
        const lastName = req.headers["remote-user-family-name"];
        const vuNetId = req.headers["remote-user-vunetid"];
        const role = req.body.role || "student";
        
        if (firstName && lastName && vuNetId && email && role) {
            let user = await User.findOne({ vuNetId });
            if (!user) {
                user = new User({
                    _id: new ObjectId(),
                    firstName,
                    lastName,
                    vuNetId,
                    email,
                    role,
                });
                await user.save();
            }

            return res.status(200).json(user);
        } else {
            return res
                .status(400)
                .send({ message: "Missing at least one required field." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Error when initializing user.",
            error: err.message,
        });
    }
};

/**
 * Deletes a user by ID in MongoDB
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details
 */
const deleteUser = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const user = await User.findOneAndDelete({uuid: id});
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully deleted user." });
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with deleting user.", error: err.message });
    }
};

/**
 * Edits a user by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details
 */
const editUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = await User.findByIdAndUpdate(id, req.body);
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            return res.status(200).json(user);
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Issue with updating user." });
    }
};

/**
 * Retrieves a user by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            return res.status(200).json(user);
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving user.",
            error: err.message,
        });
    }
};

/**
 * Retrieves all users by filter.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllUsers = async (req, res) => {
    const { role } = req.query;
    try {
        let filter = {};

        if (role) {
            filter.role = new RegExp(role, "i");
        }

        const users = await User.find(filter);

        return res.status(200).send(users);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving all users.",
            error: err.message,
        });
    }
};

/**
 * Allows a csv of all users to be downloaded
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const downloadUsers = async (req, res) => {
    const { role, fields } = req.query;
    try {
        let filter = {};
        if (role) {
            filter.role = new RegExp(role, "i");
        }
        const users = await User.find(filter).lean();
        const opts = {
            transforms: [
                flatten({ object: true, array: true, separator: "|" }),
            ],
            fields: fields.split(","),
        };

        const parser = new Parser(opts);
        const csv = parser.parse(users);
        res.header("Content-Type", "text/csv");
        res.attachment("users.csv");
        return res.status(200).send(csv);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error.", error: err });
    }
};


/**
 * Gets the total number of students
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getTotalStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" });
        return res.status(200).json(students.length);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

/**
 * allows a csv of users to be uploaded
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const uploadUsers = async (req, res) => {
    try {
        let columns = [];
        fs.createReadStream(req.file.destination + "/" + req.file.filename)
            .pipe(csvParser())
            .on("headers", (headers) => {
                columns = headers;
                const vuNetIdIndex = columns.indexOf("vuNetId");
                if (vuNetIdIndex == -1) {
                    return res.status(400).send({
                        message:
                            'File is missing the required "vuNetId" field. Please ensure this column heading is spelled correctly.',
                    });
                }
            })
            .on("data", async (row) => {
                let user = await User.findOne({ vuNetId: row["vuNetId"] });
                if (!user) {
                    user = new User(row);
                } else {
                    Object.assign(user, row);
                }
                console.log(user);
                await user.save();
            });
        return res.status(200).send({ message: "Success" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

/**
 * assigns students to group A or B randomly if they are participating in the study and not already assigned
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const assignGroups = async (req, res) => {
    try {
        const students = await User.find({ role: "student" });
        for (const student of students) {
            if (
                student.studyParticipation &&
                (!student.studyGroup ||
                    student.studyGroup != "A" ||
                    student.studyGroup != "B")
            ) {
                student.studyGroup =
                    Math.floor(Math.random() * 2) == 1 ? "A" : "B";
            }
            student.save();
        }
        return res.status(200).send({ message: "Success." });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getAllUsers,
    downloadUsers,
    uploadUsers,
    getTotalStudents,
    assignGroups,
};

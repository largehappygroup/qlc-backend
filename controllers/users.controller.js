const User = require("../models/User.js");
const Exercise = require("../models/Exercise.js");
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
    const { firstName, lastName, vuNetId, email, role } = req.body;
    try {
        if (firstName && lastName && vuNetId && email && role) {
            const user = new User({
                firstName,
                lastName,
                vuNetId,
                email,
                role,
            });

            await user.save();

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
            const user = await User.findbyIdAndDelete(id);
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
    try {
        const users = await User.find().lean();
        const opts = {
            transforms: [
                flatten({ object: true, array: true, separator: "|" }),
            ],
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

const getAverageScoreDistribution = async (req, res) => {
    try {
        const users = await User.find({ role: "student" });

        let results = [
            {
                percentage: "0%-49%",
                students: 0,
            },
            {
                percentage: "50%-59%",
                students: 0,
            },
            {
                percentage: "60%-69%",
                students: 0,
            },
            {
                percentage: "70%-79%",
                students: 0,
            },
            {
                percentage: "80%-89%",
                students: 0,
            },
            {
                percentage: "90%-100%",
                students: 0,
            },
        ];

        for (const user of users) {
            const userExercises = await Exercise.find({
                userId: user._id,
                status: "Complete",
            });
            if (userExercises.length > 0) {
                const average =
                    userExercises.reduce(function (acc, exercise) {
                        acc +=
                            (exercise.totalCorrect /
                                exercise.questions.length) *
                            100;
                        return acc;
                    }, 0) / userExercises.length;

                let range = null;
                if (average < 50) range = "0%-49%";
                else if (average < 60) range = "50%-59%";
                else if (average < 70) range = "60%-69%";
                else if (average < 80) range = "70%-79%";
                else if (average < 90) range = "80%-89%";
                else if (average <= 100) range = "90%-100%";
                else
                    throw new Error("Unnatural average calculated: " + average);

                const resultItem = results.find((r) => r.percentage === range);
                if (resultItem) {
                    resultItem.students += 1;
                }
            }
        }

        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error.", error: err });
    }
};

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



module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getAllUsers,
    downloadUsers,
    getAverageScoreDistribution,
    getTotalStudents
};

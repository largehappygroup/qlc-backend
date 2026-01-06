const User = require("../models/User.js");
const Exercise = require("../models/Exercise.js");
const fs = require("fs");
const csvParser = require("csv-parser");
const { Parser } = require("json2csv");
const { flatten } = require("@json2csv/transforms");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Registers a new user in the system or returns an existing user if already registered.
 * Extracts user details from request headers (from VUSSO authentication) and assigns a random study group.
 * Ensures all required fields are present before saving the user to the database.
 * Responds with the user object or an error message if required fields are missing.
 * @param {Object} req - Express request object containing user details in headers and role in body.
 * @param {Object} res - Express response object for sending user data or error status.
 * @returns {Object} JSON response with user data or error message.
 */
const createUser = async (req, res) => {
    try {
        // from vusso
        const email = req.headers["remote-user"];
        const firstName = req.headers["remote-user-given-name"];
        const lastName = req.headers["remote-user-family-name"];
        const vuNetId = req.headers["remote-user-vunetid"];
        const role = req.body.role || "student";
        const studyGroup = Math.floor(Math.random() * 2) == 1 ? "A" : "B";
        if (firstName && lastName && vuNetId && email && role) {
            let user = await User.findOne({ vuNetId }, { _id: 0 });
            if (!user) {
                user = new User({
                    _id: new ObjectId(),
                    firstName,
                    lastName,
                    vuNetId,
                    email,
                    role,
                    studyGroup,
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
 * Deletes a user from the database by their unique ID (uuid).
 * Returns a success message if the user is deleted, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with user ID in params.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const deleteUser = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const user = await User.findOneAndDelete({ uuid: id }, { _id: 0 });
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
 * Updates user details in the database by their vuNetId.
 * Accepts updated user data in the request body and returns the updated user object.
 * Responds with an error if the user is not found or ID is missing.
 * @param {Object} req - Express request object with user ID in params and updated data in body.
 * @param {Object} res - Express response object for sending updated user data or error status.
 * @returns {Object} JSON response with updated user data or error message.
 */
const editUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = await User.findOneAndUpdate(
                { vuNetId: id },
                req.body,
                { new: true, _id: 0 }
            );
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
 * Retrieves a user from the database by their vuNetId.
 * Returns the user object if found, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with user ID in params.
 * @param {Object} res - Express response object for sending user data or error status.
 * @returns {Object} JSON response with user data or error message.
 */
const getUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = await User.findOne({ vuNetId: id }, { _id: 0 });
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
 * Retrieves all users from the database, optionally filtered by role.
 * Supports case-insensitive role filtering using a regular expression.
 * Returns an array of user objects or an error message if retrieval fails.
 * @param {Object} req - Express request object with optional role query parameter.
 * @param {Object} res - Express response object for sending user data or error status.
 * @returns {Array} JSON array of user objects or error message.
 */
const getAllUsers = async (req, res) => {
    const { role } = req.query;
    try {
        let filter = {};

        if (role) {
            filter.role = new RegExp(role, "i");
        }

        const users = await User.find(filter, { _id: 0 });

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
 * Downloads all users as a CSV file, optionally filtered by role and with specified fields.
 * Uses json2csv to format user data and sends the CSV as an attachment in the response.
 * @param {Object} req - Express request object with optional role and fields query parameters.
 * @param {Object} res - Express response object for sending the CSV file or error status.
 * @returns {String} CSV file containing user data or error message.
 */
const downloadUsers = async (req, res) => {
    const { role, fields } = req.query;
    try {
        let filter = {};
        if (role) {
            filter.role = new RegExp(role, "i");
        }
        const users = await User.find(filter, { _id: 0 }).lean();
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
 * Returns the total number of users with the role 'student'.
 * Counts student users in the database and responds with the count as a number.
 * @param {Object} req - Express request object (not used).
 * @param {Object} res - Express response object for sending the count or error status.
 * @returns {Number} JSON response with the total number of students or error message.
 */
const getTotalStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }, { _id: 0 });
        return res.status(200).json(students.length);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

/**
 * Uploads a CSV file of users and adds or updates users in the database.
 * Reads the CSV file, checks for required columns, and saves each user (new or existing).
 * Responds with a success message or error if upload fails.
 * @param {Object} req - Express request object containing the uploaded file.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
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
                let user = await User.findOne(
                    { vuNetId: row["vuNetId"] },
                    { _id: 0 }
                );
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

module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getAllUsers,
    downloadUsers,
    uploadUsers,
    getTotalStudents,
};

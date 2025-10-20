const Assignment = require("../models/Assignment.js");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
/**
 * Initializes a chapter assignment for a chapter
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const createAssignment = async (req, res) => {
    const { chapterId, title, identifier, instructions, startDate, dueDate } =
        req.body;
    try {
        if (
            chapterId &&
            title &&
            identifier &&
            instructions &&
            startDate &&
            dueDate
        ) {
            const assignment = new Assignment({
                _id: new ObjectId(),
                uuid: crypto.randomUUID(),
                chapterId,
                title,
                identifier,
                instructions,
                startDate,
                dueDate,
            });
            await assignment.save();

            return res.status(200).json(assignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing one or more required fields." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Internal server error.",
        });
    }
};

/**
 * Deletes a chapter assignment permanently
 * @param {*} req - request object, with chapter assignment ID in params
 * @param {*} res - response object
 * @returns - response object, sends message with updated status
 */
const deleteAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const assignment = await Assignment.findOneAndDelete({
                uuid: id,
            });

            if (!assignment) {
                return res
                    .status(404)
                    .send({ message: "Assignment not found." });
            }

            return res
                .status(200)
                .send({ message: "Successfully deleted assignment." });
        } else {
            return res.status(400).send({ message: "Missing assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Internal server error.",
        });
    }
};

/**
 * Updates a chapter assignment
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const editAssignment = async (req, res) => {
    const uuid = req.params?.uuid;

    try {
        if (uuid) {
            const assignment = await Assignment.findOneAndUpdate(
                { uuid },
                req.body,
                { new: true }
            );

            if (!assignment) {
                return res
                    .status(404)
                    .send({ message: "Assignment not found." });
            }

            return res.status(200).json(assignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

/**
 * Retrieves a chapter assignment by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const assignment = await Assignment.findOne({
                uuid: id,
            });
            if (!assignment) {
                return res
                    .status(404)
                    .send({ message: "Assignment not found." });
            }
            return res.status(200).json(assignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Internal server error.",
        });
    }
};

/**
 * Retrieves all chapters assignments, with optional filtering by chapterId and date.
 * @param {*} req - request details, with optional query parameters
 * @param {*} res - response details
 * @returns - array of chapter assignments (with status)
 */
const getAllAssignments = async (req, res) => {
    const { chapterId, date } = req.query;
    try {
        let filter = {};
        if (chapterId && ObjectId.isValid(chapterId)) {
            filter.chapterId = ObjectId.createFromHexString(chapterId);
        }

        if (date) {
            filter.startDate = { $lte: new Date(date) };
            filter.dueDate = { $gte: new Date(date) };
        }

        const assignments = await Assignment.find(filter);
        return res.status(200).json(assignments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = {
    createAssignment,
    deleteAssignment,
    editAssignment,
    getAssignment,
    getAllAssignments,
};

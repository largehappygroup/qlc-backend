const Assignment = require("../models/Assignment.js");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
/**
 * Creates a new assignment for a chapter.
 * Validates required fields and saves the assignment to the database.
 * Responds with the created assignment object or an error if validation fails.
 * @param {Object} req - Express request object containing assignment details in body.
 * @param {Object} res - Express response object for sending assignment data or error status.
 * @returns {Object} JSON response with assignment data or error message.
 */
const createAssignment = async (req, res) => {
    const { chapterId, title, identifier, startDate, dueDate } =
        req.body;
    try {
        if (chapterId && title && identifier && startDate && dueDate) {
            const assignment = new Assignment({
                _id: new ObjectId(),
                uuid: crypto.randomUUID(),
                chapterId,
                title,
                identifier,
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
 * Deletes an assignment from the database by its unique ID (uuid).
 * Returns a success message if the assignment is deleted, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with assignment ID in params.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const deleteAssignmentById = async (req, res) => {
    const assignmentId = req.params?.assignmentId;

    try {
        if (assignmentId) {
            const assignment = await Assignment.findOneAndDelete(
                {
                    uuid: assignmentId,
                },
                { _id: 0 },
            );

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
 * Updates assignment details in the database by its uuid.
 * Accepts updated assignment data in the request body and returns the updated assignment object.
 * Responds with an error if the assignment is not found or ID is missing.
 * @param {Object} req - Express request object with assignment uuid in params and updated data in body.
 * @param {Object} res - Express response object for sending updated assignment data or error status.
 * @returns {Object} JSON response with updated assignment data or error message.
 */
const editAssignmentById = async (req, res) => {
    const assignmentId = req.params?.assignmentId;

    try {
        if (assignmentId) {
            const assignment = await Assignment.findOneAndUpdate(
                { uuid: assignmentId },
                req.body,
                { new: true, _id: 0 },
            );

            if (!assignment) {
                return res
                    .status(404)
                    .send({ message: "Assignment not found." });
            }

            return res.status(200).json(assignment);
        } else {
            return res.status(400).send({ message: "Missing assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

/**
 * Retrieves an assignment from the database by its uuid.
 * Returns the assignment object if found, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with assignment ID in params.
 * @param {Object} res - Express response object for sending assignment data or error status.
 * @returns {Object} JSON response with assignment data or error message.
 */
const getAssignmentById = async (req, res) => {
    const assignmentId = req.params?.assignmentId;

    try {
        if (assignmentId) {
            const assignment = await Assignment.findOne(
                {
                    uuid: assignmentId,
                },
                { _id: 0 },
            );
            if (!assignment) {
                return res
                    .status(404)
                    .send({ message: "Assignment not found." });
            }
            return res.status(200).json(assignment);
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
 * Retrieves all assignments, optionally filtered by chapterId and/or date.
 * Supports filtering assignments that are active on a given date.
 * Returns an array of assignment objects or an error message if retrieval fails.
 * @param {Object} req - Express request object with optional chapterId and date query parameters.
 * @param {Object} res - Express response object for sending assignment data or error status.
 * @returns {Array} JSON array of assignment objects or error message.
 */
const getAllAssignments = async (req, res) => {
    const { chapterId } = req.query;
    try {
        let filter = {};
        if (chapterId) {
            filter.chapterId = chapterId;
        }

        const assignments = await Assignment.find(filter, { _id: 0 });
        return res.status(200).json(assignments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = {
    createAssignment,
    deleteAssignmentById,
    editAssignmentById,
    getAssignmentById,
    getAllAssignments,
};

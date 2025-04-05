const StudentAssignment = require("../models/StudentAssignment.js");

/**
 * Initializes a chapter assignment for a chapter
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const createStudentAssignment = async (req, res) => {
    const { chapter, title, number, identifier, instructions, initialDueDate } =
        req.body;

    try {
        if (
            (chapter, title, number, identifier, instructions, initialDueDate)
        ) {
            const studentAssignment = new StudentAssignment({
                chapter,
                title,
                number,
                identifier,
                instructions,
                initialDueDate,
            });
            await studentAssignment.save();

            return res.status(200).json(studentAssignment);
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
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const deleteStudentAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const studentAssignment = await StudentAssignment.findByIdAndDelete(
                id
            );

            if (!studentAssignment) {
                return res
                    .status(404)
                    .send({ message: "Student assignment not found." });
            }

            return res
                .status(200)
                .send({ message: "Successfully delete student assignment." });
        } else {
            return res.status(400).send({ message: "Missing student ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Internal server error.",
        });
    }
};

/**
 * Updates a student assignment
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const editStudentAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const studentAssignment = await StudentAssignment.findByIdAndUpdate(
                id,
                req.body
            );

            if (!studentAssignment) {
                return res
                    .status(404)
                    .send({ message: "Student assignment not found." });
            }

            return res.status(200).json(studentAssignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing student assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

/**
 * Retrieves a student assignment by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getStudentAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const studentAssignment = await StudentAssignment.findById(id);
            if (!studentAssignment) {
                return res
                    .status(404)
                    .send({ message: "Student assignment not found." });
            }
            return res.status(200).json(studentAssignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing student assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Internal server error.",
        });
    }
};

/**
 * Retrieves all students
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllStudentAssignments = async (req, res) => {
    try {
        let filter = {};

        const studentAssignments = await StudentAssignment.find(filter);
        return res.status(200).json(studentAssignments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = {
    createStudentAssignment,
    deleteStudentAssignment,
    editStudentAssignment,
    getStudentAssignment,
    getAllStudentAssignments,
};

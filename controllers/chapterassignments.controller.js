const ChapterAssignment = require("../models/ChapterAssignment.js");
const Chapter = require("../models/Chapter.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
/**
 * Initializes a chapter assignment for a chapter
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const createChapterAssignment = async (req, res) => {
    const { chapter, title, identifier, instructions, initialDueDate } =
        req.body;
    console.log(req.body);
    try {
        if (chapter && title && identifier && instructions && initialDueDate) {
            const chapterAssignment = new ChapterAssignment({
                chapter,
                title,
                identifier,
                instructions,
                initialDueDate,
            });
            const newChapterAssignment = await chapterAssignment.save();

            const updatedChapter = await Chapter.findByIdAndUpdate(
                chapter, // The actual _id of the chapter, should be of type String or ObjectId
                {
                    $push: { assignments: newChapterAssignment._id }, // Append the new assignment _id
                },
                {
                    new: true, // Option to return the updated document
                    runValidators: true, // Ensure schema validation is run (if applicable)
                }
            );

            return res.status(200).json(newChapterAssignment);
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
const deleteChapterAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const chapterAssignment = await ChapterAssignment.findByIdAndDelete(
                id
            );

            if (!chapterAssignment) {
                return res
                    .status(404)
                    .send({ message: "Chapter assignment not found." });
            }

            return res
                .status(200)
                .send({ message: "Successfully delete chapter assignment." });
        } else {
            return res.status(400).send({ message: "Missing chapter ID." });
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
const editChapterAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const chapterAssignment = await ChapterAssignment.findByIdAndUpdate(
                id,
                req.body
            );

            if (!chapterAssignment) {
                return res
                    .status(404)
                    .send({ message: "Chapter assignment not found." });
            }

            return res.status(200).json(chapterAssignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing chapter assignment ID." });
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
const getChapterAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const chapterAssignment = await ChapterAssignment.findById(id);
            if (!chapterAssignment) {
                return res
                    .status(404)
                    .send({ message: "Chapter assignment not found." });
            }
            return res.status(200).json(chapterAssignment);
        } else {
            return res
                .status(400)
                .send({ message: "Missing chapter assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Internal server error.",
        });
    }
};

/**
 * Retrieves all chapters
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllChapterAssignments = async (req, res) => {
    const { chapter } = req.query;
    try {
        let filter = {};
        if (chapter && ObjectId.isValid(chapter)) {
            filter.chapter = ObjectId.createFromHexString(chapter); 
        }

        const chapterAssignments = await ChapterAssignment.find(filter);
        return res.status(200).json(chapterAssignments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = {
    createChapterAssignment,
    deleteChapterAssignment,
    editChapterAssignment,
    getChapterAssignment,
    getAllChapterAssignments,
};

const ChapterAssignment = require("../models/ChapterAssignment.js");
const Chapter = require("../models/Chapter.js");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
/**
 * Initializes a chapter assignment for a chapter
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const createChapterAssignment = async (req, res) => {
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
            const chapterAssignment = new ChapterAssignment({
                _id: new ObjectId(),
                uuid: crypto.randomUUID(),
                chapterId,
                title,
                identifier,
                instructions,
                startDate,
                dueDate,
            });
            await chapterAssignment.save();

            return res.status(200).json(chapterAssignment);
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
const deleteChapterAssignment = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const chapterAssignment = await ChapterAssignment.findOneAndDelete(
                {uuid: id}
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
            const chapterAssignment = await ChapterAssignment.findOneAndUpdate(
                {uuid: id},
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
            const chapterAssignment = await ChapterAssignment.findOne({uuid: id});
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
 * Retrieves all chapters assignments, with optional filtering by chapterId and date.
 * @param {*} req - request details, with optional query parameters
 * @param {*} res - response details
 * @returns - array of chapter assignments (with status)
 */
const getAllChapterAssignments = async (req, res) => {
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

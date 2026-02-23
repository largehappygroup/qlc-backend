const Chapter = require("../models/Chapter.js");
const Assignment = require("../models/Assignment.js");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
/**
 * Creates a new chapter for a course with specified details and assignments.
 * Validates required fields, assigns chapter order, and saves the chapter to the database.
 * Optionally links assignments to the chapter if provided.
 * Responds with the created chapter object or an error if validation fails.
 * @param {Object} req - Express request object containing chapter details in body.
 * @param {Object} res - Express response object for sending chapter data or error status.
 * @returns {Object} JSON response with chapter data or error message.
 */
const createChapter = async (req, res) => {
    const {
        assignments,
        title,
        released,
        description,
        requestFeedback,
    } = req.body;

    try {
        if (title && description) {
            const order =
                (await Chapter.countDocuments({}, { hint: "_id_" })) + 1;

            const chapter = new Chapter({
                _id: new ObjectId(),
                uuid: crypto.randomUUID(),
                order,
                title,
                description,
                released: released || false,
                requestFeedback,
            });

            if (assignments) {
                for (const assignment of assignments) {
                    const newAssignment = new Assignment({
                        ...assignment,
                        _id: new ObjectId(),
                        uuid: crypto.randomUUID(),
                        chapterId: chapter.uuid,
                    });
                    await newAssignment.save();
                }
            }
            await chapter.save();
            return res.status(200).json(chapter);
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
 * Deletes a chapter from the database by its unique ID (uuid).
 * Also deletes associated assignments and updates the order of remaining chapters.
 * Returns a success message if the chapter is deleted, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with chapter ID in params.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const deleteChapterById = async (req, res) => {
    const chapterId = req.params?.chapterId;

    try {
        if (chapterId) {
            const chapter = await Chapter.findOneAndDelete(
                { uuid: chapterId },
                { _id: 0 }
            );

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }

            const assignments = await Assignment.find(
                { chapterId },
                { _id: 0 }
            );
            for (const assignment of assignments) {
                await Assignment.findOneAndDelete(
                    { uuid: assignment.uuid },
                    { _id: 0 }
                );
            }

            const chaptersToFixOrder = await Chapter.find(
                {
                    order: { $gt: chapter.order },
                },
                { _id: 0 }
            );

            for (const toFixChapter of chaptersToFixOrder) {
                await Chapter.findOneAndUpdate(
                    { uuid: toFixChapter.uuid },
                    {
                        order: toFixChapter.order - 1,
                    },
                    { _id: 0 }
                );
            }

            return res
                .status(200)
                .send({ message: "Successfully delete chapter." });
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
 * Updates chapter details in the database by its uuid.
 * Accepts updated chapter data and assignments in the request body and returns the updated chapter object.
 * Handles assignment addition, deletion, and updates as needed.
 * Responds with an error if the chapter is not found or ID is missing.
 * @param {Object} req - Express request object with chapter ID in params and updated data in body.
 * @param {Object} res - Express response object for sending updated chapter data or error status.
 * @returns {Object} JSON response with updated chapter data or error message.
 */
const editChapterById = async (req, res) => {
    const chapterId = req.params?.chapterId;
    const {
        title,
        order,
        assignments,
        description,
        released,
        requestFeedback,
    } = req.body;

    try {
        if (chapterId) {
            const chapter = await Chapter.findOne({ uuid: chapterId });

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }

            chapter.title = title;
            chapter.order = order;
            chapter.description = description;
            chapter.released = released || false;
            chapter.requestFeedback = requestFeedback;

            if (assignments) {
                const incomingAssignmentIds = assignments
                    .filter((assignment) => assignment.uuid)
                    .map((assignment) => assignment.uuid);

                const existingAssignments = await Assignment.find({
                    chapterId: chapterId,
                });
                // 1. Delete removed assignments
                const toDelete = existingAssignments.filter(
                    (assignment) =>
                        !incomingAssignmentIds.includes(assignment.uuid)
                );
                await Assignment.deleteMany({
                    uuid: {
                        $in: toDelete.map((assignment) => assignment.uuid),
                    },
                });

                // 2. Process new and updated assignments
                for (const a of assignments) {
                    if (a.uuid) {
                        // Update existing assignment
                        await Assignment.findOneAndUpdate({ uuid: a.uuid }, a);
                    } else {
                        // Create new assignment
                        const newA = new Assignment({
                            _id: new ObjectId(),
                            ...a,

                            uuid: crypto.randomUUID(),
                            chapterId: chapterId,
                        });
                        await newA.save();
                    }
                }
            }

            await chapter.save();

            const updatedChapter = await Chapter.findOne(
                { uuid: chapterId },
                { _id: 0 }
            );

            return res.status(200).json(updatedChapter);
        } else {
            return res.status(400).send({ message: "Missing chapter ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

/**
 * Updates multiple chapters in the database.
 * Accepts an array of chapters in the request body and updates each chapter accordingly.
 * Returns a success message or an error if the chapters array is missing or update fails.
 * @param {Object} req - Express request object containing chapters array in body.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const editAllChapters = async (req, res) => {
    const { chapters } = req.body;

    try {
        if (chapters) {
            for (const chapter of chapters) {
                await Chapter.findOneAndUpdate(
                    { uuid: chapter.uuid },
                    chapter,
                    { _id: 0 }
                );
            }

            return res
                .status(200)
                .send({ message: "Chapters updated successfully." });
        } else {
            return res.status(400).send({ message: "Missing chapters." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

/**
 * Retrieves a chapter from the database by its uuid.
 * Returns the chapter object if found, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with chapter ID in params.
 * @param {Object} res - Express response object for sending chapter data or error status.
 * @returns {Object} JSON response with chapter data or error message.
 */
const getChapterById = async (req, res) => {
    const chapterId = req.params?.chapterId;

    try {
        if (chapterId) {
            const chapter = await Chapter.findOne({ uuid: chapterId }, { _id: 0 });
            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }
            return res.status(200).json(chapter);
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
 * Retrieves all chapters from the database, optionally filtered by order or release status.
 * Returns an array of chapter objects sorted by order, or an error message if retrieval fails.
 * @param {Object} req - Express request object with optional order and released query parameters.
 * @param {Object} res - Express response object for sending chapter data or error status.
 * @returns {Array} JSON array of chapter objects or error message.
 */
const getAllChapters = async (req, res) => {
    const { order, released } = req.query;
    try {
        let filter = {};
        if (order) {
            filter.order = Number(order);
        }

        if (released !== undefined) {
            filter.released = released === "true";
        }

        const chapters = await Chapter.find(filter, { _id: 0 }).sort({
            order: 1,
        });
        return res.status(200).json(chapters);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = {
    createChapter,
    deleteChapterById,
    editChapterById,
    getChapterById,
    getAllChapters,
    editAllChapters,
};

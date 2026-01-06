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
        learningObjectives,
        title,
        description,
        releaseDate,
        requestFeedback,
    } = req.body;

    try {
        if (learningObjectives && title && description && releaseDate) {
            const order =
                (await Chapter.countDocuments({}, { hint: "_id_" })) + 1;

            const chapter = new Chapter({
                _id: new ObjectId(),
                uuid: crypto.randomUUID(),
                order,
                learningObjectives,
                title,
                description,
                releaseDate,
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
                    chapter.assignmentIds.push(newAssignment.uuid);
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
const deleteChapter = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const chapter = await Chapter.findOneAndDelete(
                { uuid: id },
                { _id: 0 }
            );

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }
            if (chapter.assignmentIds) {
                for (const assignmentId of chapter.assignmentIds) {
                    await Assignment.findOneAndDelete(
                        { uuid: assignmentId },
                        { _id: 0 }
                    );
                }
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
const editChapter = async (req, res) => {
    const id = req.params?.id;
    const {
        title,
        order,
        assignments,
        learningObjectives,
        description,
        releaseDate,
        requestFeedback,
    } = req.body;

    try {
        if (id) {
            const chapter = await Chapter.findOne({ uuid: id });

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }

            chapter.title = title;
            chapter.learningObjectives = learningObjectives;
            chapter.order = order;
            chapter.description = description;
            chapter.releaseDate = new Date(releaseDate);
            chapter.requestFeedback = requestFeedback;

            if (assignments) {
                const newAssignmentIds = [];

                const incomingAssignmentIds = assignments
                    .filter((assignment) => assignment.uuid)
                    .map((assignment) => assignment.uuid);

                const existingAssignments = await Assignment.find({
                    chapterId: id,
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
                        newAssignmentIds.push(a.uuid);
                    } else {
                        // Create new assignment
                        const newA = new Assignment({
                            _id: new ObjectId(),
                            ...a,

                            uuid: crypto.randomUUID(),
                            chapterId: id,
                        });
                        await newA.save();
                        newAssignmentIds.push(newA.uuid);
                    }
                }

                // 3. Update chapter assignment list
                chapter.assignmentIds = newAssignmentIds;
            }

            await chapter.save();

            const updatedChapter = await Chapter.findOne({ uuid: id }, { _id: 0 });

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
const getChapter = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const chapter = await Chapter.findOne({ uuid: id }, { _id: 0 });
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
 * Retrieves all chapters from the database, optionally filtered by order or release date.
 * Returns an array of chapter objects sorted by order, or an error message if retrieval fails.
 * @param {Object} req - Express request object with optional order and date query parameters.
 * @param {Object} res - Express response object for sending chapter data or error status.
 * @returns {Array} JSON array of chapter objects or error message.
 */
const getAllChapters = async (req, res) => {
    const { order, date } = req.query;
    try {
        let filter = {};
        if (order) {
            filter.order = Number(order);
        }

        if (date) {
            filter.releaseDate = {
                $lt: new Date(date),
            };
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
    deleteChapter,
    editChapter,
    getChapter,
    getAllChapters,
    editAllChapters,
};

const Chapter = require("../models/Chapter.js");
const Assignment = require("../models/Assignment.js");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
/**
 * Initializes a chapter for a course
 * @param {*} req - request object, requires chapter details in body
 * @param {*} res - response object
 * @returns - response object with created chapter
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
 * Deletes a chapter permanently
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
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
 * Updates a chapter
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
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
            const chapter = await Chapter.findOne({ uuid: id }, { _id: 0 });

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
                            uuid: crypto.randomUUID(),
                            ...a,
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

            return res.status(200).json(chapter);
        } else {
            return res.status(400).send({ message: "Missing chapter ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Internal server error." });
    }
};

/**
 * Updates multiple chapters
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
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
 * Retrieves a chapter by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
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
 * Retrieves all chapters
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
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

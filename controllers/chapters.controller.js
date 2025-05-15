const Chapter = require("../models/Chapter.js");
const ChapterAssignment = require("../models/ChapterAssignment.js");
/**
 * Initializes a chapter for a course
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const createChapter = async (req, res) => {
    const { assignments, learningObjectives, title, description, releaseDate } =
        req.body;

    try {
        if (learningObjectives && title && description && releaseDate) {
            const order =
                (await Chapter.countDocuments({}, { hint: "_id_" })) + 1;
            const chapter = new Chapter({
                order,
                learningObjectives,
                title,
                description,
                releaseDate,
            });
            await chapter.save();

            if (assignments) {
                const newAssignments = await ChapterAssignment.insertMany(
                    assignments.map((assignment) => ({
                        ...assignment,
                        chapterId: chapter._id,
                    }))
                );
                chapter.assignmentIds = newAssignments.map(
                    (assignment) => assignment._id
                );
                await chapter.save();
            }

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
            const chapter = await Chapter.findByIdAndDelete(id);

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }
            if (chapter.assignmentIds) {
                for (const assignment of chapter.assignmentIds) {
                    await ChapterAssignment.findByIdAndDelete(assignment);
                }
            }

            const chaptersToFixOrder = await Chapter.find({
                order: { $gt: chapter.order },
            });

            for (const toFixChapter of chaptersToFixOrder) {
                await Chapter.findByIdAndUpdate(toFixChapter._id, {
                    order: toFixChapter.order - 1,
                });
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
    } = req.body;

    try {
        if (id) {
            const chapter = await Chapter.findById(id);

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }

            chapter.title = title;
            chapter.learningObjectives = learningObjectives;
            chapter.order = order;
            chapter.description = description;
            chapter.releaseDate = releaseDate;

            if (assignments) {
                const newAssignmentIds = [];

                const incomingAssignmentIds = assignments
                    .filter((a) => a._id)
                    .map((a) => a._id.toString());
                const existingAssignments = await ChapterAssignment.find({
                    chapterId: id,
                });
                const toDelete = existingAssignments.filter(
                    (a) => !incomingAssignmentIds.includes(a._id.toString())
                );
                await ChapterAssignment.deleteMany({
                    _id: { $in: toDelete.map((a) => a._id) },
                });

                // 2. Process new and updated assignments
                for (const a of assignments) {
                    if (a._id) {
                        // Update existing assignment
                        await ChapterAssignment.findByIdAndUpdate(a._id, a);
                        newAssignmentIds.push(a._id);
                    } else {
                        // Create new assignment
                        const newA = await ChapterAssignment.create({
                            ...a,
                            chapterId: id,
                        });
                        newAssignmentIds.push(newA._id);
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
                await Chapter.findByIdAndUpdate(chapter._id, chapter);
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
            const chapter = await Chapter.findById(id);
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
        const chapters = await Chapter.find(filter);
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

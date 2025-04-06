const Chapter = require("../models/Chapter.js");

/**
 * Initializes a chapter for a course
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns - response object with updated status
 */
const createChapter = async (req, res) => {
    const { assignments, learningObjectives, title } = req.body;

    try {
        if (learningObjectives && title) {
            const order = (await Chapter.countDocuments( {}, { hint: "_id_"} )) + 1;
            const chapter = new Chapter({
                order,
                assignments,
                learningObjectives,
                title,
            });
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
            const chapter = await Chapter.findByIdAndDelete(id);

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
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

    try {
        if (id) {
            const chapter = await Chapter.findByIdAndUpdate(id, req.body);

            if (!chapter) {
                return res.status(404).send({ message: "Chapter not found." });
            }

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
    try {
        let filter = {};

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
};

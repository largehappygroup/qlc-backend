const Feedback = require("../models/Feedback");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * createFeedback creates a new feedback entry.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - JSON object with the created feedback entry or error message
 */
const createFeedback = async (req, res) => {
    try {
        const { userId, chapterId } = req.query;
        const {
            easeOfUnderstanding,
            reasonableQuestions,
            helpsUnderstandCode,
            helpsUnderstandJava,
            comments,
        } = req.body;
        const date = new Date();
        const feedback = new Feedback({
            _id: new ObjectId(),
            userId: ObjectId(userId),
            chapterId: ObjectId(chapterId),
            date,
            easeOfUnderstanding,
            reasonableQuestions,
            helpsUnderstandCode,
            helpsUnderstandJava,
            comments,
        });

        await feedback.save();
        return res.status(201).json(feedback);
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * downloadFeedback retrieves feedback entries for a specific user.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - JSON array of feedback entries or error message
 */
const downloadFeedback = async (req, res) => {
    try {
        const { userId } = req.params;
        const feedbacks = await Feedback.find({ userId: ObjectId(userId) });
        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error downloading feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createFeedback,
    downloadFeedback,
};

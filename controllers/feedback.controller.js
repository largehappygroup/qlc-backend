const Feedback = require("../models/Feedback");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const crypto = require("crypto");

/**
 * Creates a new feedback entry for a user and chapter.
 * Validates and saves feedback details such as understanding, question quality, and comments.
 * Responds with the created feedback object or an error if creation fails.
 * @param {Object} req - Express request object containing feedback details in body and user/chapter IDs in query.
 * @param {Object} res - Express response object for sending feedback data or error status.
 * @returns {Object} JSON response with created feedback data or error message.
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
            uuid: crypto.randomUUID(),
            userId,
            chapterId,
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
 * Checks if feedback already exists for a specific user and chapter.
 * Searches the database for feedback matching the provided userId and chapterId.
 * Responds with a boolean indicating existence or an error if the check fails.
 * @param {Object} req - Express request object with userId and chapterId in query.
 * @param {Object} res - Express response object for sending existence status or error message.
 * @returns {Object} JSON response with 'exists' boolean or error message.
 */
const doesFeedbackExist = async (req, res) => {
    try {
        const { userId, chapterId } = req.query;
        const existingFeedback = await Feedback.findOne(
            {
                userId: userId,
                chapterId: chapterId,
            },
            { _id: 0 }
        );
        return res.status(200).json({ exists: existingFeedback !== null });
    } catch (error) {
        console.error("Error checking feedback existence:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Retrieves all feedback entries for a specific user by their ObjectId.
 * Returns an array of feedback objects or an error if retrieval fails.
 * @param {Object} req - Express request object with userId in params.
 * @param {Object} res - Express response object for sending feedback data or error status.
 * @returns {Array} JSON array of feedback objects or error message.
 */
const downloadFeedback = async (req, res) => {
    try {
        const { userId } = req.params;
        const feedbacks = await Feedback.find(
            { userId: ObjectId(userId) },
            { _id: 0 }
        );
        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error downloading feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createFeedback,
    downloadFeedback,
    doesFeedbackExist,
};

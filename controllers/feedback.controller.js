const Feedback = require("../models/Feedback");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const createFeedback = async (req, res) => {
    try {
        const { userId, exerciseId } = req.params;
        const { responses } = req.body;
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

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

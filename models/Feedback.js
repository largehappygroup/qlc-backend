const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const FeedbackSchema = new Schema({
    _id: {
        type: ObjectId, // mongodb generated unique id for the feedback
        required: true,
    },
    chapterId: {
        type: ObjectId, // mongodb generated unique id for the chapter corresponding to feedback
        required: true,
        ref: "Chapter",
    },
    userId: {
        type: ObjectId, // mongodb generated unique id for the user providing feedback
        ref: "User",
        required: true,
    },
    date: {
        type: Date, // date when the feedback was submitted
        required: true,
        default: Date.now,
    },
    easeOfUnderstanding: {
        type: Number, // rating for ease of understanding the material
        required: true,
        enum: [1, 2, 3, 4, 5], // 1 is very difficult, 5 is very easy
    },
    reasonableQuestions: {
        type: Number, // rating for reasonableness of the questions
        required: true,
        enum: [1, 2, 3, 4, 5], // 1 is very unreasonable, 5 is very reasonable
    },
    helpsUnderstandCode: {
        type: Number, // rating for helpfulness of assignments
        required: true,
        enum: [1, 2, 3, 4, 5], // 1 is not helpful, 5 is very helpful
    },
    helpsUnderstandJava: {
        type: Number, // rating for helpfulness of the programming language used
        required: true,
        enum: [1, 2, 3, 4, 5], // 1 is not helpful, 5 is very helpful
    },
    comments: {
        type: String, // optional additional comments from the user
    },
});
module.exports = mongoose.model("Feedback", FeedbackSchema);

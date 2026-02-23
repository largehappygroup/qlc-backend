const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserAnswerSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    timeStamp: {
        type: Date, // timestamp for when the user submitted their answer
        required: true,
    },
    selectedAnswer: {
        type: String, // the user's chosen answer
        required: true,
    },
});

const QuestionSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    uuid: {
        type: String, // universally unique identifier for the question in the exercise
        required: true,
        unique: true,
    },
    ratings: {
        type: Map,
        of: Number,
        default: () => new Map(),
    },
    query: {
        type: String, // prompt/question for the exercise
        required: true,
    },
    type: {
        type: String, // format for the question
        enum: ["multiple-choice", "coding"],
        required: true,
    },
    hints: [{ type: String }], // generated as the user needs, no more than 3
    correctAnswer: {
        type: String, // the true answer, aggregate together with otherAnswers as availableAnswers
        required: true,
    },
    otherAnswers: [{ type: String }], // incorrect answers, aggregate as availableAnswers
    explanation: {
        type: String, // explanation for the correct answer
        required: true,
    },
    userAnswers: [UserAnswerSchema],
    timeSpent: {
        type: Number, // total amount of time spent in seconds on the question
        required: true,
    },
    status: {
        type: String, // status indicators for the user
        required: true,
        enum: ["not-attempted", "incorrect-attempted", "correct-attempted", "completed"],
    },
    correct: {
        type: Boolean, // whether the user got the answer correct the first time
    },
});

const ExerciseSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    uuid: {
        type: String, // universally unique identifier for the exercise
        required: true,
        unique: true,
    },
    createdTimestamp: {
        type: Date, // when the exercise was created
        required: true,
    },
    userId: {
        type: String, // vunetid for the user answering questions
        ref: "User",
        required: true,
    },
    authorId: {
        type: String, // vunetid for the author of the original assignment
        ref: "User",
        required: true,
    },
    assignmentId: {
        type: String, // universally unique identifier for the assignment corresponding to exercise
        required: true,
        ref: "Assignment",
    },
    questions: [QuestionSchema], // list of questions in the exercise
    status: {
        type: String, // status indicators for the user
        required: true,
        enum: ["Not Started", "In Progress", "Complete"],
    },
    completedTimestamp: {
        type: Date, // when the user completely finished the exercise
    },
    completedQuestions: {
        type: Number,
        required: true,
    },
    totalTimeSpent: { type: Number, required: true }, // total amount of time spent in seconds on all questions
    totalCorrect: { type: Number, required: true }, // number of questions the user got correct the first time they saw the question
    submission: {
        type: String, // the student's code submission for coding exercises
        required: true,
    },
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);

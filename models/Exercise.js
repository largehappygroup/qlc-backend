const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ExerciseSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    assignmentId: {
        type: ObjectId,
        required: true,
    },
    questions: [
        {
            _id: {
                type: ObjectId,
                required: true,
            },
            query: {
                type: String,
                required: true, // the prompt being asked
            },
            type: {
                type: String,
                enum: ["multiple-choice", "coding"],
                required: true,
            },
            hints: [{ type: String }], // generated as the user needs, no more than 3
            correctAnswer: {
                type: String,
                required: true, 
            },
            difficulty: {
                type: String,
                required: true,
            },
            otherAnswers: [{ type: String }],
            explanation: {
                type: String,
                required: true,
            },
            userAnswers: [
                {
                    _id: {
                        type: ObjectId,
                        required: true,
                    },
                    timeStamp: {
                        type: Date,
                        required: true,
                    },
                    selectedAnswer: {
                        type: String,
                        required: true,
                    },
                },
            ],
            timeSpent: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        required: true,
        enum: ["Not Started", "In Progress", "Complete"],
    },
    totalTimeSpent: { type: Number, required: true },
    totalCorrect: { type: Number, required: true },
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);

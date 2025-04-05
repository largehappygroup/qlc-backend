const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/**
 * The details of the student's submission
 */

const StudentAssignmentSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    userId: {
        type: String, // vunetid
        required: true
    },
    assignmentId: {
        type: ObjectId,
        ref: "ChapterAssignment",
        required: true
    }
});

module.exports = StudentAssignment = mongoose.model("studentassignments", StudentAssignmentSchema);
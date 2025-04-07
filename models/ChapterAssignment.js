const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/**
 * Details for the instructor to initialize
 */

const ChapterAssignmentSchema = new Schema({
    chapter: {
        type: ObjectId,
        required: true,
        ref: "Chapter",
    },
    title: {
        type: String,
        required: true, // (ex. MadLibs)
    },
    identifier: {
        type: String,
        required: true, // (ex. PA05-W)
    },
    instructions: {
        type: String,
        required: true, // basic instructions given to students
    },
    initialDueDate: {
        type: Date,
        required: true, // when students submit their own code
    },
});

module.exports = ChapterAssignment = mongoose.model(
    "chapterassignments",
    ChapterAssignmentSchema
);

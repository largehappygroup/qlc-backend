const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ChapterSchema = new Schema({
    order: {
        type: Number,
        required: true, // Chapter 1 vs. Chapter 2 etc
    },
    assignmentIds: [{
        type: ObjectId, // corresponding assignment IDs for the chapter
        ref: "ChapterAssignment",
    }],
    learningObjectives: [{
        type: String, // list of learning objectives based on CS1101
        required: true
    }],
    title: {
        type: String,
        required: true // a recognizable title (ex. Introduction to Methods)
    }
});

module.exports = Chapter = mongoose.model("chapters", ChapterSchema);
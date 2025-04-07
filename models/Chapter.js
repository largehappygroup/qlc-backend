const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ChapterSchema = new Schema({
    order: {
        type: Number,
        required: true, // Chapter 1 vs. Chapter 2 etc
    },
    assignments: [{
        type: ObjectId,
        ref: "ChapterAssignment",
    }],
    learningObjectives: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true // a recognizable title (ex. Introduction to Methods)
    }
});

module.exports = Chapter = mongoose.model("chapters", ChapterSchema);
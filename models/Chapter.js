const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ChapterSchema = new Schema({
    _id: {
        type: ObjectId, // mongodb generated unique id for the chapter
        required: true,
    },
    uuid: {
        type: String, // universally unique identifier for the chapter
        required: true,
        unique: true,
    },
    order: {
        type: Number,
        required: true, // Chapter 1 vs. Chapter 2 etc
    },
    title: {
        type: String,
        required: true // a recognizable title (ex. Introduction to Methods)
    },
    description: {
        type: String, // general description informing what the chapter is about
    },
    released: {
        type: Boolean,
        required: true // when the chapter should appear in the students' pages
    },
    requestFeedback: {
        type: Boolean,
        required: true,
        default: false // whether to prompt students for feedback on this chapter
    }

});

module.exports = Chapter = mongoose.model("chapters", ChapterSchema);
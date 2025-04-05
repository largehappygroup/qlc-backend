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
        ref: "Assignment",
    }],
    learningObjectives: [{
        type: String,
        required: true
    }]
});

module.exports = Chapter = mongoose.model("chapters", ChapterSchema);
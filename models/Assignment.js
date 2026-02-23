const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/**
 * Details for the instructor to initialize
 * a chapter assignment for a chapter
 */
const AssignmentSchema = new Schema({
    _id: {
        type: ObjectId, // mongodb generated unique id for the chapter assignment
        required: true,
    },
    uuid: {
        type: String, // universally unique identifier for the chapter assignment
        required: true,
        unique: true,
    },
    chapterId: {
        type: String, // universally unique identifier for the corresponding chapter
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
        unique: true,
    },
  
    dueDate: {
        type: Date,
        required: true, // when exercises are due for the students
    },
});



module.exports = Assignment = mongoose.model(
    "assignments",
    AssignmentSchema
);

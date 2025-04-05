const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
    _id: {
        type: String, // vunetID
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    term: {
        type: String,
        required: true
    },
    termYear: {
        type: Number,
        required: true
    },
    classification: {
        type: String,
        required: true,
        enum: ["Freshman", "Sophomore", "Junior", "Senior"]
    }

});

module.exports = Student = mongoose.model("student", StudentSchema);

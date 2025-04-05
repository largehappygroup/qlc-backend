const mongoose = require("mongoose");
const { Schema } = mongoose;

const FacultySchema = new Schema({
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
    role: {
        type: String,
        required: true,
        enum: ["admin", "faculty", "ta"]
    },

});

module.exports = Faculty = mongoose.model("faculty", FacultySchema);

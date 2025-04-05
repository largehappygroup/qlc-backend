const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
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
        enum: ["admin", "faculty", "ta", "student"]
    },
    term: {
        type: String,
        required: true
    },
    termYear: {
        type: Number,
        required: true
    }
});

module.exports = User = mongoose.model("user", UserSchema);

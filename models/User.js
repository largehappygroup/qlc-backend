const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
    _id: {
        type: ObjectId, // mongodb generated unique id for the user
        required: true,
    },
    vuNetId: {
        type: String, // vunetID for the user
        required: true,
        unique: true,
    },
    firstName: {
        type: String, // first name for the user
        required: true,
    },
    lastName: {
        type: String, // last name for the user
        required: true,
    },
    email: {
        type: String, // email address for the user
        required: true,
        unique: true,
    },
    role: {
        type: String, // user roles (for access purposes)
        required: true,
        enum: ["admin", "faculty", "ta", "student"],
    },
    termSeason: { // required for students
        type: String,
        enum: ["Spring", "Summer", "Fall"]
    },
    termYear: { // required for students
        type: Number,
    },
    studyParticipation: { // required for students
        type: Boolean,
    },
    studyGroup: {
        type: String,
        enum: ["A", "B"] // A means receive own things, B means receive other people's
    }
});

module.exports = User = mongoose.model("user", UserSchema);

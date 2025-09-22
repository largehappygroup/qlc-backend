const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const FeedbackSchema = new Schema({
    _id: {
        type: ObjectId, // mongodb generated unique id for the feedback
        required: true,
    },
    userId: {
        type: ObjectId, // mongodb generated unique id for the user providing feedback
        ref: "User",
        required: true,
    },
    date: {
        type: Date, // date when the feedback was submitted
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model("Feedback", FeedbackSchema);

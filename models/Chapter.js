const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ChapterSchema = new Schema({
    order: {
        type: Number,
        required: true,
    },
    assignment: {
        type: ObjectId,
        ref: "Assignment",
    },
});

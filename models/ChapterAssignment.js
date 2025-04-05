const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const AssignmentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true // (ex. MadLibs)
    }, 
    number: {
        type: Number,
        required: true // (ex. PA05, we're storing 5)
    },
    identifier: {
        type: String,
        required: true // (ex. PA05-W, stores W)
    },

    instructions: {
        type: String,
        required: true // basic instructions given to students
    },
    initialDueDate: {
        type: Date,
        required: true // when students submit their own code
    },
});

const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        uuid: { type: String, required: true, unique: true },
        type: { type: String, required: true }, 
        payload: { type: mongoose.Schema.Types.Mixed, required: true },
        status: {
            type: String,
            enum: [
                "pending",
                "in-progress",
                "completed",
                "failed",
                "cancelled",
            ],
            default: "pending",
        },
        progress: { type: Number, default: 0 }, // percentage of completion
        totalTasks: { type: Number, default: 0 }, // total number of tasks
        completedTasks: { type: Number, default: 0 }, // number of completed tasks
        failedReason: { type: String, default: null }, // reason for failure if status is 'failed'
        attempts: { type: Number, default: 0 },
        lockedAt: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("job", JobSchema);

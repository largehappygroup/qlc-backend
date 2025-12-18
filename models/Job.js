const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        payload: { type: mongoose.Schema.Types.Mixed },
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
        progress: { type: Number, default: 0 },
        totalTasks: { type: Number, default: 0 },
        completedTasks: { type: Number, default: 0 },
        failedReason: { type: String, default: null },
        result: { type: mongoose.Schema.Types.Mixed, default: null },
        attempts: { type: Number, default: 0 },
        lockedAt: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

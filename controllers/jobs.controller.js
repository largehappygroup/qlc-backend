const Job = require("../models/Job.js");

/**
 * Returns status for a queued job
 */
const getJobStatus = async (req, res) => {
    const jobId = req.params?.id;
    try {
        if (!jobId) return res.status(400).send({ message: "Missing Job ID." });

        const job = await Job.findById(jobId).lean();
        if (!job) return res.status(404).send({ message: "Job not found." });

        return res.status(200).json({
            id: job._id,
            type: job.type,
            payload: job.payload,
            status: job.status,
            progress: job.progress || 0,
            totalTasks: job.totalTasks || 0,
            completedTasks: job.completedTasks || 0,
            failedReason: job.failedReason || null,
            result: job.result || null,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue retrieving job status.",
            error: err.message,
        });
    }
};

/**
 * Returns active job for a chapter (pending or in-progress)
 */
const getJobByChapter = async (req, res) => {
    const chapterId = req.params?.chapterId;
    try {
        if (!chapterId) return res.status(400).send({ message: "Missing Chapter ID." });

        const job = await Job.findOne({
            "payload.chapterId": chapterId,
            status: { $in: ["pending", "in-progress"] },
        })
            .sort({ createdAt: -1 })
            .lean();

        if (!job) return res.status(404).send({ message: "No active job for chapter." });

        return res.status(200).json({
            id: job._id,
            type: job.type,
            payload: job.payload,
            status: job.status,
            progress: job.progress || 0,
            totalTasks: job.totalTasks || 0,
            completedTasks: job.completedTasks || 0,
            failedReason: job.failedReason || null,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Issue retrieving job by chapter.", error: err.message });
    }
};

module.exports = {
    getJobStatus,
    getJobByChapter,
};

const Job = require("../models/Job.js");

/**
 * Retrieves the status of a queued job by its unique job ID.
 * Returns job details including type, payload, status, progress, and timestamps.
 * Responds with job information or an error if the job is not found or ID is missing.
 * @param {Object} req - Express request object with job ID in params.
 * @param {Object} res - Express response object for sending job status or error message.
 * @returns {Object} JSON response with job status details or error message.
 */
const getJobStatus = async (req, res) => {
    const jobId = req.params?.id;
    try {
        if (!jobId) return res.status(400).send({ message: "Missing Job ID." });

        const job = await Job.findOne({ uuid: jobId }).lean();
        if (!job) return res.status(404).send({ message: "Job not found." });

        return res.status(200).json({
            uuid: job.uuid,
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
        return res.status(500).send({
            message: "Issue retrieving job status.",
            error: err.message,
        });
    }
};

/**
 * Retrieves the most recent active job (pending or in-progress) for a given assignment ID.
 * Searches for jobs matching the assignment ID and returns job details if found.
 * Responds with job information or an error if no active job is found or assignment ID is missing.
 * @param {Object} req - Express request object with assignmentId in params.
 * @param {Object} res - Express response object for sending job status or error message.
 * @returns {Object} JSON response with job status details or error message.
 */
const getJobByAssignment = async (req, res) => {
    const assignmentId = req.params?.assignmentId;
    try {
        if (!assignmentId)
            return res.status(400).send({ message: "Missing Assignment ID." });
        const job = await Job.findOne({
            "payload.assignmentId": assignmentId,
            status: { $in: ["pending", "in-progress"] },
        })
            .sort({ createdAt: -1 })
            .lean();

        if (!job)
            return res
                .status(404)
                .send({ message: "No active job for chapter." });

        return res.status(200).json({
            uuid: job.uuid,
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
        return res
            .status(500)
            .send({
                message: "Issue retrieving job by chapter.",
                error: err.message,
            });
    }
};

module.exports = {
    getJobStatus,
    getJobByAssignment,
};

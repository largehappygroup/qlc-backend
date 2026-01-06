/**
 * Detached script that processes a single Job by id.
 * Invoked as a child process from the controller with a Job ID arg.
 * Usage: node workers/pregenerateExercises.js <jobId>
 */
const connectDB = require("../config/database.js");
const mongoose = require("mongoose");
const Job = require("../models/Job.js");
const Exercise = require("../models/Exercise.js");
const User = require("../models/User.js");
const Chapter = require("../models/Chapter.js");
const { generateExercise } = require("../services/exerciseGeneration.js");

/**
 * Main function to process a Job for batch exercise generation.
 * Connects to the database, finds the Job, and iterates over all students to generate exercises.
 * Updates Job progress and handles errors for each student.
 * Cleans up the PM2 process when finished.
 * @param {string} jobId - The Job UUID to process.
 */
async function run(jobId) {
    // Connect to MongoDB
    await connectDB();

    // Find the Job document by UUID
    const job = await Job.findOne({ uuid: jobId });
    if (!job) {
        console.error(`Job ${jobId} not found`);
        process.exit(1);
    }

    // Mark job as in-progress
    job.status = "in-progress";
    await job.save();

    // Get assignmentId from job payload
    const assignmentId = job.payload?.assignmentId;

    // Get all students (by vuNetId)
    const students = await User.find(
        { role: "student" },
        { _id: 0, vuNetId: 1 }
    );

    // Prepare tasks for each student
    const tasks = [];
    for (const student of students) {
        tasks.push({ userId: student.vuNetId, assignmentId });
    }

    // Track total and completed tasks for progress
    const total = Number(job.totalTasks) || tasks.length;
    let completed = 0;

    // Iterate over each student/assignment task
    for (const t of tasks) {
        try {
            // Check if exercise already exists for this user/assignment
            const exists = await Exercise.findOne({
                userId: t.userId,
                assignmentId: t.assignmentId,
            });
            if (exists) {
                // Already exists, skip generation
                completed += 1;
                job.progress = Math.round((completed / total) * 100);
                job.completedTasks = (job.completedTasks || 0) + 1;
                await job.save();
                continue;
            }

            // Generate and save new exercise for this user/assignment
            const exercise = await generateExercise(t.userId, t.assignmentId);
            await exercise.save();
            completed += 1;
            job.progress = Math.round((completed / total) * 100);
            job.completedTasks = (job.completedTasks || 0) + 1;
            await job.save();

            // Log progress after first exercise is created
            if (completed === 1) {
                console.log(
                    `Job ${jobId}: first exercise created — progress ${job.progress}%`
                );
            }
        } catch (err) {
            // Log error for this student/assignment
            console.error(
                `Error processing task ${t.userId}/${t.assignmentId}:`,
                err.message
            );
            // Rethrow error to stop the process (could be changed to continue on error)
            throw err;
            // The following code is unreachable due to throw, but would update job with error info:
            // completed += 1;
            // job.progress = Math.round((completed / total) * 100);
            // job.completedTasks = (job.completedTasks || 0) + 1;
            // job.result = job.result || [];
            // job.result.push({ error: err.message });
            // await job.save();
        }
    }

    // Mark job as completed and set progress to 100%
    job.status = "completed";
    job.progress = 100;
    await job.save();
    console.log(`Job ${jobId} completed by detached process.`);

    // If running under PM2, delete the process after completion
    if (process.env.pm_id) {
        const { spawn } = require("child_process");
        const delProc = spawn("pm2", ["delete", process.env.pm_id], {
            stdio: "inherit",
        });
        delProc.on("close", () => {
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
}

// Get jobId from command line arguments
const jobId = process.argv[2];
if (!jobId) {
    console.error("Usage: node workers/pregenerateExercises.js <jobId>");
    process.exit(1);
}

// Start the batch exercise generation process
run(jobId).catch((err) => {
    console.error("pregenerate script error:", err.message);
    process.exit(1);
});

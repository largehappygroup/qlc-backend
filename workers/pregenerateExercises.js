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
const { generateExercise } = require("../services/exerciseGeneraton.js");

async function run(jobId) {
    await connectDB();
    
    const job = await Job.findOne({ uuid: jobId });
    if (!job) {
        console.error(`Job ${jobId} not found`);
        process.exit(1);
    }

    // mark in-progress
    job.status = "in-progress";
    await job.save();

    const chapterId = job.payload?.chapterId;
    const students = await User.find({ role: "student" }, { _id: 0, vuNetId: 1 });
    const chapter = await Chapter.findOne({ uuid: chapterId }, { _id: 0 }).lean();
    const assignments = chapter?.assignmentIds || [];

    const tasks = [];
    for (const student of students) {
        for (const assignmentId of assignments) {
            tasks.push({ userId: student.vuNetId, assignmentId });
        }
    }

    const total = Number(job.totalTasks) || tasks.length;
    let completed = 0;

    for (const t of tasks) {
        try {
            const exists = await Exercise.findOne({ userId: t.userId, assignmentId: t.assignmentId });
            if (exists) {
                completed += 1;
                job.progress = Math.round((completed / total) * 100);
                job.completedTasks = (job.completedTasks || 0) + 1;
                await job.save();
                continue;
            }

            const exercise = await generateExercise(t.userId, t.assignmentId);
            await exercise.save();
            completed += 1;
            job.progress = Math.round((completed / total) * 100);
            job.completedTasks = (job.completedTasks || 0) + 1;
            await job.save();

            if (completed === 1) {
                console.log(`Job ${jobId}: first exercise created — progress ${job.progress}%`);
            }
        } catch (err) {
            console.error(`Error processing task ${t.userId}/${t.assignmentId}:`, err.message);
            throw err;
            completed += 1;
            job.progress = Math.round((completed / total) * 100);
            job.completedTasks = (job.completedTasks || 0) + 1;
            job.result = job.result || [];
            job.result.push({ error: err.message });
            await job.save();
        }
    }

    job.status = "completed";
    job.progress = 100;
    await job.save();
    console.log(`Job ${jobId} completed by detached process.`);
    process.exit(0);
}

const jobId = process.argv[2];
if (!jobId) {
    console.error("Usage: node workers/pregenerateExercises.js <jobId>");
    process.exit(1);
}

run(jobId).catch((err) => {
    console.error("pregenerate script error:", err.message);
    process.exit(1);
});

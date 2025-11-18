/*
  Worker for processing `createExercises` jobs from BullMQ.
  Run this as a separate process (e.g. `node workers/createExercisesWorker.js`).
*/
const { Worker } = require("bullmq");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const crypto = require("crypto");

const Exercise = require("../models/Exercise.js");
const Assignment = require("../models/Assignment.js");
const User = require("../models/User.js");
const Chapter = require("../models/Chapter.js");

const { generateExercise } = require("../services/exerciseGenerator.js");
const { connection } = require("../services/queue");

const queueName = "createExercises";

const processCreateExercises = async (job) => {
    const { chapterId, totalTasks } = job.data;

    // defensive defaults
    const total = Number(totalTasks) || 0;
    let completed = 0;

    if (!chapterId) {
        throw new Error("Missing chapterId in job data");
    }

    const students = await User.find({ role: "student" }, { _id: 0, vuNetId: 1 });
    const chapter = await Chapter.findOne({ uuid: chapterId }, { _id: 0 }).lean();
    const assignments = chapter?.assignmentIds || [];

    // build flat task list
    const tasks = [];
    for (const student of students) {
        for (const assignmentId of assignments) {
            tasks.push({ userId: student.vuNetId, assignmentId });
        }
    }

    const batchSize = 5; // concurrency per batch

    for (let i = 0; i < tasks.length; i += batchSize) {
        const batch = tasks.slice(i, i + batchSize);
        await Promise.all(
            batch.map(async (t) => {
                try {
                    // idempotency: skip if exercise exists
                    const exists = await Exercise.findOne({ userId: t.userId, assignmentId: t.assignmentId });
                    if (exists) {
                        completed += 1;
                        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                        await job.updateProgress(percent);
                        return;
                    }

                    const exercise = await generateExercise(t.userId, t.assignmentId);
                    await exercise.save();
                    completed += 1;
                    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                    await job.updateProgress(percent);
                } catch (err) {
                    // log and continue with other tasks
                    await job.log(`Task error for ${t.userId}/${t.assignmentId}: ${err.message}`);
                    completed += 1; // mark as progressed so we don't stall overall progress
                    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                    await job.updateProgress(percent);
                }
            })
        );
    }

    // final progress
    await job.updateProgress(100);
    return { completed: true, created: tasks.length };
};

// Start the worker
const worker = new Worker(
    queueName,
    async (job) => {
        console.log(`Processing job ${job.id} (${job.name})`);
        const result = await processCreateExercises(job);
        console.log(`Job ${job.id} completed`);
        return result;
    },
    { connection, concurrency: 1 }
);

worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
});

worker.on("completed", (job) => {
    console.log(`Job ${job.id} finished successfully`);
});

console.log("createExercises worker started");

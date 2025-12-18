/**
 * Mongo-backed worker for processing createExercises jobs.
 * Run as: `node workers/createExercisesWorker-mongo.js`
 */
const connectDB = require("../config/database.js");
const Job = require("../models/Job.js");
const Exercise = require("../models/Exercise.js");
const User = require("../models/User.js");
const Chapter = require("../models/Chapter.js");
const { generateExercise } = require("../services/exerciseGenerator.js");

const POLL_INTERVAL_MS = Number(process.env.WORKER_POLL_MS) || 3000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const claimJob = async () => {
    // atomically claim a single pending job
    const now = new Date();
    const job = await Job.findOneAndUpdate(
        { status: "pending" },
        { $set: { status: "in-progress", lockedAt: now }, $inc: { attempts: 1 } },
        { new: true }
    ).lean();
    return job;
};

const processJob = async (jobDoc) => {
    const { _id, payload, totalTasks } = jobDoc;
    const { chapterId } = payload || {};

    let completed = 0;
    try {
        if (!chapterId) throw new Error("Missing chapterId in job payload");

        const students = await User.find({ role: "student" }, { _id: 0, vuNetId: 1 });
        const chapter = await Chapter.findOne({ uuid: chapterId }, { _id: 0 }).lean();
        const assignments = chapter?.assignmentIds || [];

        const tasks = [];
        for (const student of students) {
            for (const assignmentId of assignments) {
                tasks.push({ userId: student.vuNetId, assignmentId });
            }
        }

        const total = Number(totalTasks) || tasks.length;
        const batchSize = 5;

        for (let i = 0; i < tasks.length; i += batchSize) {
            const batch = tasks.slice(i, i + batchSize);
            await Promise.all(
                batch.map(async (t) => {
                    try {
                        const exists = await Exercise.findOne({ userId: t.userId, assignmentId: t.assignmentId });
                        if (exists) {
                            completed += 1;
                            await Job.findByIdAndUpdate(_id, {
                                $set: { progress: Math.round((completed / total) * 100) },
                                $inc: { completedTasks: 1 },
                            });
                            return;
                        }

                        const exercise = await generateExercise(t.userId, t.assignmentId);
                        await exercise.save();

                        completed += 1;
                        const newProgress = Math.round((completed / total) * 100);
                        await Job.findByIdAndUpdate(_id, {
                            $set: { progress: newProgress },
                            $inc: { completedTasks: 1 },
                        });

                        // log after the first exercise is created so progress visibility can be debugged
                        if (completed === 1) {
                            console.log(`Job ${_id}: first exercise created — progress ${newProgress}%`);
                        }
                    } catch (err) {
                        console.error(`Task error for ${t.userId}/${t.assignmentId}:`, err.message);
                        // mark task as progressed so the job doesn't stall
                        completed += 1;
                        await Job.findByIdAndUpdate(_id, {
                            $set: { progress: Math.round((completed / total) * 100) },
                            $inc: { completedTasks: 1 },
                            $push: { result: { error: err.message } },
                        });
                    }
                })
            );
        }

        // finalize
        await Job.findByIdAndUpdate(_id, { $set: { progress: 100, status: "completed" }, $setOnInsert: { result: { completed: true } } });
        console.log(`Job ${_id} completed`);
    } catch (err) {
        console.error(`Job ${_id} failed:`, err.message);
        await Job.findByIdAndUpdate(_id, { $set: { status: "failed", failedReason: err.message } });
    }
};

const run = async () => {
    await connectDB();

    console.log("Mongo job worker started — polling for jobs");

    while (true) {
        try {
            const job = await claimJob();
            if (job) {
                console.log(`Claimed job ${job._id} (type=${job.type})`);
                await processJob(job);
            } else {
                // no job, sleep
                await sleep(POLL_INTERVAL_MS);
            }
        } catch (err) {
            console.error("Worker loop error:", err.message);
            await sleep(Math.max(1000, POLL_INTERVAL_MS));
        }
    }
};

run().catch((err) => {
    console.error("Worker fatal error:", err.message);
    process.exit(1);
});

/**
 * Run-once script to claim and process a single pending createExercises Job.
 * Usage:
 *   node workers/runCreateExercisesJob.js            # claim any pending job
 *   node workers/runCreateExercisesJob.js <chapterId> # claim pending job for chapter
 */
const connectDB = require("../config/database.js");
const Job = require("../models/Job.js");
const Exercise = require("../models/Exercise.js");
const User = require("../models/User.js");
const Chapter = require("../models/Chapter.js");
const { generateExercise } = require("../services/exerciseGenerator.js");

const POLL_BATCH_SIZE = 5;

async function claimJob(chapterId) {
    const now = new Date();
    let query = { status: "pending" };
    if (chapterId) query["payload.chapterId"] = chapterId;

    const job = await Job.findOneAndUpdate(
        query,
        { $set: { status: "in-progress", lockedAt: now }, $inc: { attempts: 1 } },
        { new: true }
    ).lean();
    return job;
}

async function processJob(jobDoc) {
    const { _id, payload, totalTasks } = jobDoc;
    const chapterId = payload?.chapterId;

    if (!chapterId) {
        throw new Error("Missing chapterId in job payload");
    }

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
    let completed = 0;

    for (let i = 0; i < tasks.length; i += POLL_BATCH_SIZE) {
        const batch = tasks.slice(i, i + POLL_BATCH_SIZE);
        await Promise.all(
            batch.map(async (t) => {
                try {
                    const exists = await Exercise.findOne({ userId: t.userId, assignmentId: t.assignmentId });
                    if (exists) {
                        completed += 1;
                        const newProgress = Math.round((completed / total) * 100);
                        await Job.findByIdAndUpdate(_id, { $set: { progress: newProgress }, $inc: { completedTasks: 1 } });
                        return;
                    }

                    const exercise = await generateExercise(t.userId, t.assignmentId);
                    await exercise.save();

                    completed += 1;
                    const newProgress = Math.round((completed / total) * 100);
                    await Job.findByIdAndUpdate(_id, { $set: { progress: newProgress }, $inc: { completedTasks: 1 } });

                    // helpful log for debugging progress visibility
                    if (completed === 1) {
                        console.log(`Job ${_id}: first exercise created — progress ${newProgress}%`);
                    }
                } catch (err) {
                    console.error(`Task error for ${t.userId}/${t.assignmentId}:`, err.message);
                    completed += 1;
                    const newProgress = Math.round((completed / total) * 100);
                    await Job.findByIdAndUpdate(_id, {
                        $set: { progress: newProgress },
                        $inc: { completedTasks: 1 },
                        $push: { result: { error: err.message } },
                    });
                }
            })
        );
    }

    await Job.findByIdAndUpdate(_id, { $set: { progress: 100, status: "completed" } });
    console.log(`Job ${_id} processing finished.`);
}

async function main() {
    try {
        await connectDB();

        const chapterId = process.argv[2];
        console.log(`Looking for pending job${chapterId ? ` for chapter ${chapterId}` : ""}...`);
        const job = await claimJob(chapterId);
        if (!job) {
            console.log("No pending job found. Exiting.");
            process.exit(0);
        }

        console.log(`Claimed job ${job._id} (type=${job.type}) — starting processing.`);
        await processJob(job);
        process.exit(0);
    } catch (err) {
        console.error("Run job error:", err.message);
        process.exit(1);
    }
}

main();

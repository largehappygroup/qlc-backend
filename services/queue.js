const { Queue, QueueScheduler } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379");
const queueName = "createExercises";

// Ensure scheduler is running to handle stalled jobs
const queueScheduler = new QueueScheduler(queueName, { connection });
const queue = new Queue(queueName, { connection });

module.exports = {
    queue,
    queueScheduler,
    connection,
};

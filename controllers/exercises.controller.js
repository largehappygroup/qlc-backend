const Exercise = require("../models/Exercise.js");
const Assignment = require("../models/Assignment.js");
const User = require("../models/User.js");
const Chapter = require("../models/Chapter.js");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const { Parser } = require("json2csv");
const { unwind, flatten } = require("@json2csv/transforms");

const Job = require("../models/Job.js");
const { spawn } = require("child_process");
const path = require("path");
const crypto = require("crypto");

const { filterQuestion } = require("../utils/exerciseHelpers.js");
const { generateExercise } = require("../services/exerciseGeneration.js");

/**
 * Creates a single, new exercise for a user and assignment using AI generation.
 * Validates userId and assignmentId, generates and saves the exercise, and filters questions for response.
 * Responds with the created exercise details or an error if initialization fails.
 * @param {Object} req - Express request object with userId and assignmentId in query.
 * @param {Object} res - Express response object for sending exercise data or error message.
 * @returns {Object} JSON response with created exercise details or error message.
 */
const regenerateExercise = async (req, res) => {
    const { userId, assignmentId } = req.query;
    try {
        if (userId && assignmentId) {
            const exercise = await generateExercise(userId, assignmentId);
            await exercise.save();
            const returnExercise = exercise.toObject();
            for (let i = 0; i < returnExercise.questions.length; i++) {
                const question = returnExercise.questions[i];
                returnExercise.questions[i] = filterQuestion(question);
            }

            return res.status(200).json({ exercise: returnExercise });
        } else {
            return res.status(400).send({ message: "User ID not found." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Error when initializing exercise.",
            error: err.message,
        });
    }
};

/**
 * Creates exercises for all students in a chapter in batch mode.
 * Queues a background job for exercise creation and spawns a process to handle it asynchronously.
 * Responds with job status and a message indicating background processing.
 * @param {Object} req - Express request object with assignmentId in query.
 * @param {Object} res - Express response object for sending job status or error message.
 * @returns {Object} JSON response with job status and message or error.
 */
const createExercises = async (req, res) => {
    const {assignmentId } = req.query;

    try {
        if (assignmentId) {
            // compute totalTasks so frontend can show progress if desired
            const students = await User.find(
                { role: "student" },
                { _id: 0, vuNetId: 1 }
            );
            // create a Job document so a background script can pick it up
            const job = new Job({
                uuid: crypto.randomUUID(),
                type: "createExercises",
                payload: {
                    assignmentId,
                    requestedBy: req.headers["remote-user-vunetid"],
                },
                totalTasks: students.length,
                progress: 0,
                status: "pending",
            });

            await job.save();

            // spawn a detached Node process to run the pregenerate script asynchronously
            try {
                const scriptPath = path.join(
                    __dirname,
                    "..",
                    "workers",
                    "pregenerateExercises.js"
                );
                // Use pm2 to start the script with logs and no auto-restart
                const pm2Args = [
                    "start",
                    scriptPath,
                    "--name",
                    `pregenerate-${job.uuid}`,
                    "--no-autorestart",
                    "--",
                    job.uuid.toString(),
                ];
                const child = spawn("pm2", pm2Args, {
                    detached: false,
                    stdio: "inherit",
                });

                child.unref();
        
            } catch (spawnErr) {
                console.error(
                    "Failed to spawn pregenerate script:",
                    spawnErr.message
                );
                // do not fail the HTTP request — job will remain pending and can be processed later
            }

            return res.status(202).json({
                jobId: job.uuid,
                statusUrl: `/jobs/${job.uuid}`,
                message:
                    "Exercise creation requested. Processing in background.",
            });
        } else {
            return res.status(400).send({ message: "Assignment ID not found." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Error when queuing exercises creation.",
            error: err.message,
        });
    }
};

/**
 * Deletes an exercise from the database by its unique ID (uuid).
 * Returns a success message if the exercise is deleted, or an error if not found or ID is missing.
 * @param {Object} req - Express request object with exercise ID in params.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const deleteExercise = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const exercise = await Exercise.findOneAndDelete(
                { uuid: id },
                { _id: 0 }
            );
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully deleted exercise." });
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with deleting exercise.",
            error: err.message,
        });
    }
};

/**
 * Updates exercise details in the database by its uuid.
 * Accepts updated exercise data in the request body and returns a success message.
 * Responds with an error if the exercise is not found or ID is missing.
 * @param {Object} req - Express request object with exercise ID in params and updated data in body.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const editExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercise = await Exercise.findOneAndUpdate(
                { uuid: id },
                req.body,
                { new: true, _id: 0 }
            );
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully updated exercise." });
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with updating exercise.",
            error: err.message,
        });
    }
};

/**
 * Retrieves the most recent exercise for a user and assignment by assignmentId and userId.
 * Filters questions for response and returns the most recent exercise based on createdTimestamp.
 * Responds with exercise data or an error if not found or parameters are missing.
 * @param {Object} req - Express request object with assignmentId and userId in query.
 * @param {Object} res - Express response object for sending exercise data or error message.
 * @returns {Object} JSON response with exercise data or error message.
 */
const getMostRecentExercise = async (req, res) => {
    const {assignmentId, userId} = req.query;
    try {
        if (assignmentId && userId) {
            // Find all exercises with this assignmentId (should be one, but just in case)
            const exercises = await Exercise.find(
                { assignmentId: assignmentId, userId: userId },
                { _id: 0 }
            ).lean();
            if (!exercises || exercises.length === 0) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            // Pick the one with the most recent createdTimestamp
            let exercise = exercises[0];
            if (exercises.length > 1) {
                exercise = exercises.reduce((latest, curr) => {
                    const latestTime = latest.createdTimestamp
                        ? new Date(latest.createdTimestamp).getTime()
                        : 0;
                    const currTime = curr.createdTimestamp
                        ? new Date(curr.createdTimestamp).getTime()
                        : 0;
                    return currTime > latestTime ? curr : latest;
                }, exercises[0]);
            }

            for (let i = 0; i < exercise.questions.length; i++) {
                const question = exercise.questions[i];
                exercise.questions[i] = filterQuestion(question);
            }

            return res.status(200).json(exercise);
        } else {
            return res.status(400).send({ message: "Missing Assignment ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving exercise.",
            error: err.message,
        });
    }
};

/**
 * Retrieves all exercises matching filter criteria (userId, date, month, year, assignmentId).
 * Returns only the most recent exercise for each unique userId-assignmentId pair.
 * Filters questions for response and returns an array of exercises or error message.
 * @param {Object} req - Express request object with filter parameters in query.
 * @param {Object} res - Express response object for sending exercise data or error message.
 * @returns {Array} JSON array of exercise objects or error message.
 */
const getAllExercises = async (req, res) => {
    const { userId, date, month, year, assignmentId } = req.query;
    try {
        let filter = {};

        if (userId) {
            filter.userId = userId;
        }

        if (assignmentId) {
            filter.assignmentId = assignmentId;
        }

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.date = { $gte: startOfDay, $lte: endOfDay };
        } else if (month && year) {
            const startOfMonth = new Date(year, month, 1);
            const today = new Date();
            if (Number(month) === today.getMonth()) {
                today.setHours(-1, 59, 59, 999);
                filter.date = { $gte: startOfMonth, $lte: today };
            } else {
                const endOfMonth = new Date(year, Number(month) + 1, 0);
                filter.date = { $gte: startOfMonth, $lte: endOfMonth };
            }
        }

        let exercises = await Exercise.find(filter, { _id: 0 }).lean();

        // Map to store the most recent exercise for each userId-assignmentId pair
        const uniqueMap = new Map();
        for (const exercise of exercises) {
            const key = `${exercise.userId}::${exercise.assignmentId}`;
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, exercise);
            } else {
                const existing = uniqueMap.get(key);
                const existingTime = existing.createdTimestamp ? new Date(existing.createdTimestamp).getTime() : 0;
                const currTime = exercise.createdTimestamp ? new Date(exercise.createdTimestamp).getTime() : 0;
                if (currTime > existingTime) {
                    uniqueMap.set(key, exercise);
                }
            }
        }

        // Only keep the most recent exercise for each userId-assignmentId pair
        exercises = Array.from(uniqueMap.values());

        for (let j = 0; j < exercises.length; j++) {
            const exercise = exercises[j];
            for (let i = 0; i < exercise.questions.length; i++) {
                const question = exercise.questions[i];
                const filteredQuestion = filterQuestion(question);
                exercises[j].questions[i] = filteredQuestion;
            }
        }
        return res.status(200).json(exercises);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving all exercises.",
            error: err.message,
        });
    }
};

/**
 * Downloads all exercises as a CSV file, with specified fields and transformations.
 * Uses json2csv to format exercise data and sends the CSV as an attachment in the response.
 * @param {Object} req - Express request object with fields in query.
 * @param {Object} res - Express response object for sending the CSV file or error status.
 * @returns {String} CSV file containing exercise data or error message.
 */
const downloadExercises = async (req, res) => {
    const { fields } = req.query;

    try {
        const exercises = await Exercise.find({}, { _id: 0 }).lean();
        const opts = {
            transforms: [
                unwind({
                    paths: ["questions", "questions.userAnswers"],
                    blankOut: true,
                }),
                flatten({ object: true, array: true, separator: "|" }),
            ],
            fields: fields.split(","),
        };
        const parser = new Parser(opts);
        const csv = parser.parse(exercises);
        res.header("Content-Type", "text/csv");
        res.attachment("exercises.csv");
        return res.status(200).send(csv);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

/**
 * Submits user ratings for a specific question in an exercise.
 * Updates the ratings for the question and saves the exercise.
 * Responds with a success message or error if the exercise or question is not found.
 * @param {Object} req - Express request object with exercise ID in params and ratings in body.
 * @param {Object} res - Express response object for sending status messages.
 * @returns {Object} JSON response with success or error message.
 */
const submitRatings = async (req, res) => {
    const exerciseId = req.params?.id;
    const { questionId, ratings } = req.body;

    try {
        const exercise = await Exercise.findOne({ uuid: exerciseId });
        if (!exercise) {
            return res.status(404).send({ message: "Exercise not found." });
        }

        const question = exercise.questions.find((q) => questionId === q.uuid);
        if (!question) {
            return res.status(404).send({ message: "Question not found." });
        }

        if (
            ratings &&
            typeof ratings === "object" &&
            !(ratings instanceof Map)
        ) {
            question.ratings = new Map(Object.entries(ratings));
        } else {
            question.ratings = ratings;
        }

        await exercise.save();

        return res
            .status(200)
            .send({ message: "Ratings submitted successfully." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with submitting ratings.",
            error: err.message,
        });
    }
};

/**
 * Checks the user's answer for a specific question in an exercise.
 * Updates completion status, correctness, and time spent, and saves the exercise.
 * Responds with the result (correct/incorrect) or error if the exercise or question is not found.
 * @param {Object} req - Express request object with exercise ID in params and answer data in body.
 * @param {Object} res - Express response object for sending result or error message.
 * @returns {Object} JSON response with result or error message.
 */
const checkQuestion = async (req, res) => {
    const id = req.params?.id; // exercise id
    const { questionId } = req.query;
    const { userAnswer, timeSpent } = req.body;
    console.log(req.body);
    try {
        if (id) {
            const exercise = await Exercise.findOne({ uuid: id });
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }

            const question = exercise.questions.find(
                (question) => questionId === question.uuid
            );
            if (!question) {
                return res.status(404).send({ message: "Question not found." });
            }

            const result = userAnswer === question.correctAnswer;

            if (result) {
                exercise.completedQuestions += 1;

                // increment if this is the user's first attempt
                if (question.userAnswers.length === 0) {
                    exercise.totalCorrect += 1;
                    question.correct = true;
                }

                exercise.totalTimeSpent += timeSpent;

                if (exercise.completedQuestions === exercise.questions.length) {
                    exercise.status = "Complete";
                    exercise.completedTimestamp = new Date();
                } else {
                    exercise.status = "In Progress";
                }
            } else {
                question.correct = false;
            }

            question.timeSpent = timeSpent;

            question.userAnswers = [
                ...question.userAnswers,
                {
                    _id: new ObjectId(),
                    timeStamp: new Date(),
                    selectedAnswer: userAnswer,
                },
            ];

            await exercise.save();

            return res.status(200).json({ result });
        } else {
            return res.status(400).send({ message: "Missing Question ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with checking user answer.",
            error: err.message,
        });
    }
};

/**
 * Calculates the average score for all completed exercises, optionally filtered by userId.
 * Returns the average score as a rounded integer or 0 if no exercises are found.
 * @param {Object} req - Express request object with optional userId in query.
 * @param {Object} res - Express response object for sending average score or error message.
 * @returns {Number} JSON response with average score or error message.
 */
const getAverageScore = async (req, res) => {
    const { userId } = req.query;
    try {
        let filter = { status: "Complete" };

        if (userId) {
            filter.userId = userId;
        }
        const exercises = await Exercise.find(filter, { _id: 0 });
        if (exercises.length > 0) {
            const average =
                exercises.reduce(function (acc, exercise) {
                    acc +=
                        (exercise.totalCorrect / exercise.questions.length) *
                        100;
                    return acc;
                }, 0) / exercises.length;
            return res.status(200).json(Math.round(average));
        } else {
            return res.status(201).json(0);
        }
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

/**
 * Calculates the average time spent on all completed exercises, optionally filtered by userId.
 * Returns the average time spent in HH:MM:SS format or 0 if no exercises are found.
 * @param {Object} req - Express request object with optional userId in query.
 * @param {Object} res - Express response object for sending average time or error message.
 * @returns {String|Number} JSON response with formatted time or error message.
 */
const getAverageTimeSpent = async (req, res) => {
    const { userId } = req.query;
    try {
        let filter = { status: "Complete" };

        if (userId) {
            filter.userId = userId;
        }
        const exercises = await Exercise.find(filter, { _id: 0 });
        if (exercises.length > 0) {
            const timeSpent =
                exercises.reduce(function (acc, exercise) {
                    acc += exercise.totalTimeSpent;
                    return acc;
                }, 0) / exercises.length;

            const asDate = new Date(timeSpent * 1000);
            const format =
                asDate.getUTCHours().toString().padStart(2, "0") +
                ":" +
                asDate.getUTCMinutes().toString().padStart(2, "0") +
                ":" +
                asDate.getUTCSeconds().toString().padStart(2, "0");
            return res.status(200).json(format);
        } else {
            return res.status(201).json(0);
        }
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

/**
 * Gets the distribution of average scores across all students or a specific student if userId is provided.
 * Returns an array of score ranges with counts and colors for visualization.
 * @param {Object} req - Express request object with optional userId in query.
 * @param {Object} res - Express response object for sending score distribution or error message.
 * @returns {Array} JSON array of score distribution objects or error message.
 */
const getAverageScoreDistribution = async (req, res) => {
    const { userId } = req.query;
    try {
        let results = [
            {
                percentage: "0-49",
                data: 0,
                color: "red",
            },
            {
                percentage: "50-59",
                data: 0,
                color: "purple",
            },
            {
                percentage: "60-69",
                data: 0,
                color: "orange",
            },
            {
                percentage: "70-79",
                data: 0,
                color: "yellow",
            },
            {
                percentage: "80-89",
                data: 0,
                color: "blue",
            },
            {
                percentage: "90-100",
                data: 0,
                color: "green",
            },
        ];
        if (userId) {
            const userExercises = await Exercise.find(
                {
                    userId: userId,
                    status: "Complete",
                },
                { _id: 0 }
            );
            for (const exercise of userExercises) {
                const score =
                    (exercise.totalCorrect / exercise.questions.length) * 100;
                let range = null;

                if (score < 50) range = "0-49";
                else if (score < 60) range = "50-59";
                else if (score < 70) range = "60-69";
                else if (score < 80) range = "70-79";
                else if (score < 90) range = "80-89";
                else if (score <= 100) range = "90-100";
                else throw new Error("Unnatural average calculated: " + score);

                const resultItem = results.find((r) => r.percentage === range);
                if (resultItem) {
                    resultItem.data += 1;
                }
            }
        } else {
            const users = await User.find({}, { _id: 0 });

            for (const user of users) {
                const userExercises = await Exercise.find(
                    {
                        userId: user.vuNetId,
                        status: "Complete",
                    },
                    { _id: 0 }
                );
                if (userExercises.length > 0) {
                    const average =
                        userExercises.reduce(function (acc, exercise) {
                            acc +=
                                (exercise.totalCorrect /
                                    exercise.questions.length) *
                                100;
                            return acc;
                        }, 0) / userExercises.length;

                    let range = null;
                    if (average < 50) range = "0-49";
                    else if (average < 60) range = "50-59";
                    else if (average < 70) range = "60-69";
                    else if (average < 80) range = "70-79";
                    else if (average < 90) range = "80-89";
                    else if (average <= 100) range = "90-100";
                    else
                        throw new Error(
                            "Unnatural average calculated: " + average
                        );

                    const resultItem = results.find(
                        (r) => r.percentage === range
                    );
                    if (resultItem) {
                        resultItem.data += 1;
                    }
                }
            }
        }

        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error.", error: err });
    }
};

/**
 * Retrieves recent activity for completed exercises, optionally filtered by userId.
 * Returns an array of recent exercise completions with user, assignment, timestamp, and score details.
 * @param {Object} req - Express request object with optional userId in query.
 * @param {Object} res - Express response object for sending activity data or error message.
 * @returns {Array} JSON array of recent activity objects or error message.
 */
const getRecentActivity = async (req, res) => {
    const { userId } = req.query;

    try {
        let filter = { status: "Complete" };
        if (userId) {
            filter.userId = userId;
        }

        const exercises = await Exercise.find(filter, { _id: 0 })
            .sort({ completedTimestamp: -1 })
            .limit(10);

        let results = [];

        for (const exercise of exercises) {
            const user = await User.findOne(
                { vuNetId: exercise.userId },
                { _id: 0 }
            );
            const assignment = await Assignment.findOne(
                {
                    uuid: exercise.assignmentId,
                },
                { _id: 0 }
            );
            const dateTimestamp = new Date(exercise.completedTimestamp);
            const now = new Date();

            // Strip times
            const today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            const givenDate = new Date(
                dateTimestamp.getFullYear(),
                dateTimestamp.getMonth(),
                dateTimestamp.getDate()
            );

            // Calculate day difference
            const msPerDay = 24 * 60 * 60 * 1000;
            const dayDiff = Math.floor((today - givenDate) / msPerDay);

            let timestamp;

            if (dayDiff === 0) {
                // Today
                timestamp =
                    "Today, " +
                    dateTimestamp.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    });
            } else if (dayDiff === 1) {
                timestamp = "Yesterday";
            } else if (dayDiff >= 2 && dayDiff <= 6) {
                timestamp = `${dayDiff} days ago`;
            } else {
                timestamp = dateTimestamp.toLocaleDateString();
            }

            const result = {
                userName: `${user.firstName} ${user.lastName}`,
                assignment: {
                    identifier: assignment.identifier,
                    title: assignment.title,
                },
                completedTimestamp: timestamp,
                score: `${exercise.totalCorrect}/${exercise.questions.length}`,
            };

            results.push(result);
        }

        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    regenerateExercise,
    createExercises,
    deleteExercise,
    editExercise,
    getMostRecentExercise,
    getAllExercises,
    downloadExercises,
    checkQuestion,
    getAverageScore,
    getAverageTimeSpent,
    getRecentActivity,
    submitRatings,
    getAverageScoreDistribution,
};

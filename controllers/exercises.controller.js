const Exercise = require("../models/Exercise.js");
const ChapterAssignment = require("../models/ChapterAssignment.js");
const User = require("../models/User.js");
const { ObjectId } = mongoose.Types;
const crypto = require("crypto");

const mongoose = require("mongoose");
const { Parser } = require("json2csv");
const { unwind, flatten } = require("@json2csv/transforms");

const { generateQuestions } = require("../services/questionGeneration.js");
const {
    fetchStudentCode,
    doesSubmissionFolderExist,
} = require("../utils/student_code.js");
const {
    systemPrompt,
    userPrompt,
} = require("../utils/prompt_question_types.js");

const { filterQuestion } = require("../utils/exercise_helpers.js");

/**
 * Creates a new exercise with AI.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - {exercise: created exercise details, studentCode: code associated with the exercise}
 */
const createExercise = async (req, res) => {
    const { userId, assignmentId } = req.query;
    try {
        if (userId && assignmentId) {
            const search = await Exercise.findOne({
                userId: ObjectId.createFromHexString(userId),
                assignmentId: ObjectId.createFromHexString(assignmentId),
            }).lean();

            const assignment = await ChapterAssignment.findById(assignmentId);

            if (search) {
                for (let i = 0; i < search.questions.length; i++) {
                    const question = search.questions[i];
                    search.questions[i] = filterQuestion(question);
                }
                const author = await User.findById(search.authorId);
                const studentCode = await fetchStudentCode(
                    author.email,
                    assignment.identifier
                );

                return res
                    .status(201)
                    .json({ exercise: search, studentCode: studentCode });
            }

            const user = await User.findById(userId);
            const author = await findSubmission(user, assignment);

            const studentCode = await fetchStudentCode(
                author.email,
                assignment.identifier
            );

            const questionTypes = [
                "Variable State Trace",
                "Execution Path Analysis",
            ];

            let questions = [];

            let numberOfQuestions = 5;
            const typesCount = questionTypes.length;
            const base = Math.floor(numberOfQuestions / typesCount);
            const remainder = numberOfQuestions % typesCount;

            for (let i = 0; i < typesCount; i++) {
                const qt = questionTypes[i];
                const count = i === typesCount - 1 ? base + remainder : base;

                if (count <= 0) continue;

                const systemPromptText = systemPrompt(qt, count);
                const userPromptText = await userPrompt(studentCode);
                let questionsForType = await generateQuestions(
                    systemPromptText,
                    userPromptText
                );

                // Add additional fields to each question
                questionsForType = questionsForType.map((question) => ({
                    ...question,
                    _id: new mongoose.Types.ObjectId(),
                    uuid: crypto.randomUUID(),
                    difficulty: "easy",
                    timeSpent: 0,
                    type: "multiple-choice",
                }));

                questions = questions.concat(questionsForType);
            }
            const exercise = new Exercise({
                _id: new ObjectId(),
                uuid: crypto.randomUUID(),
                userId,
                authorId: author.vuNetId,
                assignmentId,
                questions,
                status: "Not Started",
                totalTimeSpent: 0,
                totalCorrect: 0,
                completedQuestions: 0,
            });
            await exercise.save();
            const returnExercise = exercise.toObject();
            for (let i = 0; i < returnExercise.questions.length; i++) {
                const question = returnExercise.questions[i];
                returnExercise.questions[i] = filterQuestion(question);
            }

            return res
                .status(200)
                .json({ exercise: returnExercise, studentCode: studentCode });
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
 * Deletes an exercise from MongoDB by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const deleteExercise = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const exercise = await Exercise.findOneAndDelete({uuid: id});
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
 * Updates exercise by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const editExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercise = await Exercise.findOneAndUpdate({uuid: id}, req.body);
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
 * Retrieves an exercise by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercise = await Exercise.findOne({uuid: id}).lean();
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }

            for (let i = 0; i < exercise.questions.length; i++) {
                const question = exercise.questions[i];
                exercise.questions[i] = filterQuestion(question);
            }

            return res.status(200).json(exercise);
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
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
 * Retrieves all exercises by filter.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllExercises = async (req, res) => {
    const { userId, date, month, year, assignmentId } = req.query;
    try {
        let filter = {};

        if (userId) {
            filter.userId = ObjectId.createFromHexString(userId);
        }

        if (assignmentId) {
            filter.assignmentId = ObjectId.createFromHexString(assignmentId);
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

        const exercises = await Exercise.find(filter).lean();

        for (let j = 0; j < exercises.length; j++) {
            const exercise = exercises[j];

            for (let i = 0; i < exercise.questions.length; i++) {
                const question = exercise.questions[i];
                let availableAnswers = [
                    question.correctAnswer,
                    ...question.otherAnswers,
                ]
                    .map((value) => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value);

                const filteredQuestion = {
                    _id: question._id,
                    uuid: question.uuid,
                    query: question.query,
                    type: question.type,
                    hints: question.hints,
                    topics: question.topics,
                    explanation: question.explanation,
                    availableAnswers,
                    userAnswers: question.userAnswers,
                    timeSpent: question.timeSpent,
                    correct: question.correct,
                };

                exercises[j].questions[i] = filteredQuestion;
            }
        }
        console.log(filter);
        return res.status(200).json(exercises);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving all exercises.",
            error: err.message,
        });
    }
};

const downloadExercises = async (req, res) => {
    const { fields } = req.query;

    try {
        const exercises = await Exercise.find().lean();
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

const submitRatings = async (req, res) => {
    const exerciseId = req.params?.id;
    const { questionId, ratings } = req.body;

    try {
        const exercise = await Exercise.findById(exerciseId);
        if (!exercise) {
            return res.status(404).send({ message: "Exercise not found." });
        }

        const question = exercise.questions.find((q) =>
            questionId.equals(q.uuid)
        );
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
 * checks the user's answer for a question in an exercise
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const checkQuestion = async (req, res) => {
    const id = req.params?.id; // exercise id
    const { questionId } = req.query;
    const { userAnswer, timeSpent } = req.body;
    console.log(req.body);
    try {
        if (id) {
            const exercise = await Exercise.findOne({uuid: id});
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }

            const question = exercise.questions.find((question) =>
                questionId.equals(question.uuid)
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

            exercise.save();

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
 * gets the average score for all completed exercises, optionally filtered by userId
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAverageScore = async (req, res) => {
    const { userId } = req.query;
    try {
        let filter = { status: "Complete" };

        if (userId) {
            filter.userId = ObjectId.createFromHexString(userId);
        }
        const exercises = await Exercise.find(filter);
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
 * gets the average time spent on all completed exercises, optionally filtered by userId
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAverageTimeSpent = async (req, res) => {
    const { userId } = req.query;
    try {
        let filter = { status: "Complete" };

        if (userId) {
            filter.userId = ObjectId.createFromHexString(userId);
        }
        const exercises = await Exercise.find(filter);
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
 * Gets the distribution of average scores across all students or a specific student if userId is provided
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
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
            const userExercises = await Exercise.find({
                userId: ObjectId.createFromHexString(userId),
                status: "Complete",
            });
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
            const users = await User.find();

            for (const user of users) {
                const userExercises = await Exercise.find({
                    userId: user.vuNetId,
                    status: "Complete",
                });
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
 * gets recent activity, optionally filtered by userId
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getRecentActivity = async (req, res) => {
    const { userId } = req.query;

    try {
        let filter = { status: "Complete" };
        if (userId) {
            filter.userId = ObjectId.createFromHexString(userId);
        }

        const exercises = await Exercise.find(filter)
            .sort({ completedTimestamp: -1 })
            .limit(10);

        let results = [];

        for (const exercise of exercises) {
            const user = await User.findById(exercise.userId);
            const assignment = await ChapterAssignment.findById(
                exercise.assignmentId
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
    createExercise,
    deleteExercise,
    editExercise,
    getExercise,
    getAllExercises,
    downloadExercises,
    checkQuestion,
    getAverageScore,
    getAverageTimeSpent,
    getRecentActivity,
    submitRatings,
    getAverageScoreDistribution,
};

const Exercise = require("../models/Exercise.js");
const mongoose = require("mongoose");
const axios = require("axios");
const { ObjectId } = mongoose.Types;

/**
 * Creates a new exercise with AI.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const createExercise = async (req, res) => {
    const { userId } = req.query;
    try {
        if (userId) {
            const date = new Date();

            const search = await Exercise.findOne({
                date: {
                    $gte: new Date(date.setHours(0, 0, 0, 0)), // Start date
                    $lte: new Date(date.setHours(23, 59, 59, 999)), // End date
                },
            });

            if (search) {
                return res.status(201).json(search);
            }

            const questions = [];
            const exercise = new Exercise({
                _id: new ObjectId(),
                date,
                userId,
                topics: ["Programming"],
                questions,
                status: "incomplete",
                totalTimeSpent: 0,
                totalCorrect: 0,
            });
            await exercise.save();

            return res.status(200).json(exercise);
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
            const exercise = await Exercise.findbyIdAndDelete(id);
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
            const exercise = await Exercise.findByIdAndUpdate(id, req.body);
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
            const exercise = await Exercise.findById(id);
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            if (exercise.questions) {
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
                        query: question.query,
                        type: question.type,
                        hints: question.hints,
                        topics: question.topics,
                        difficulty: question.difficulty,
                        explanation: question.explanation,
                        availableAnswers: availableAnswers,
                        userAnswers: question.userAnswers,
                        timeSpent: question.timeSpent,
                    };

                    exercise.questions[i] = filteredQuestion;
                }
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
                    query: question.query,
                    type: question.type,
                    hints: question.hints,
                    topics: question.topics,
                    difficulty: question.difficulty,
                    explanation: question.explanation,
                    availableAnswers,
                    userAnswers: question.userAnswers,
                    timeSpent: question.timeSpent,
                };

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

const downloadExercises = async (req, res) => {
    return res.status(200);
};

module.exports = {
    createExercise,
    deleteExercise,
    editExercise,
    getExercise,
    getAllExercises,
    downloadExercises,
};

const Exercise = require("../models/Exercise.js");
const Assignment = require("../models/Assignment.js");
const User = require("../models/User.js");
const mongoose = require("mongoose");
const crypto = require("crypto");

const { generateQuestions } = require("./questionGeneration.js");
const { fetchStudentCode } = require("../utils/student_code.js");
const { systemPrompt, userPrompt } = require("../utils/prompt_question_types.js");
const { findSubmission } = require("../utils/exercise_helpers.js");

const { ObjectId } = mongoose.Types;

const generateExercise = async (userId, assignmentId) => {
    const user = await User.findOne({ vuNetId: userId }, { _id: 0 });
    const assignment = await Assignment.findOne(
        { uuid: assignmentId },
        { _id: 0 }
    );
    const author = await findSubmission(user, assignment);

    const studentCode = await fetchStudentCode(author.email, assignment.identifier);

    const questionTypes = ["Variable State Trace", "Execution Path Analysis"];

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
        let questionsForType = await generateQuestions(systemPromptText, userPromptText);

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
        studentCode: studentCode,
    });
    return exercise;
};

module.exports = { generateExercise };

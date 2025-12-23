const Exercise = require("../models/Exercise.js");
const Assignment = require("../models/Assignment.js");
const User = require("../models/User.js");
const mongoose = require("mongoose");
const crypto = require("crypto");

const { fetchStudentCode } = require("../utils/studentCode.js");
const {
    systemPromptQuestionCategories,
} = require("../utils/systemPromptQuestionCategories");

const {
    systemPromptSpecificQuestionCategory,
    userPrompt,
} = require("../utils/promptFinalQuestion.js");
const { findSubmission } = require("../utils/exerciseHelpers.js");

const { generateAIResponse } = require("../services/responseGeneration.js");

const { ObjectId } = mongoose.Types;

/**
 * Generates question categories based on system prompt and students' submission.
 * @param {string} submission - student's submission.
 * @param {string} systemPrompt - systemPromptQuestionCategories is passed as the systemPrompt.
 */
const questionCategoriesGeneration = async (
    submission,
    systemPrompt,
    maxAPIRetries
) => {
    let allGeneratedQuestionCategories = [];
    const userPrompt = `
            Student's code:
            ${submission}
  `;

    // Call the AI service. We assume it returns a ready-to-use array of objects.
    const questionCategoriesFromAI = await generateAIResponse(
        systemPrompt,
        userPrompt
    );

    let c = 0;
    while (!questionCategoriesFromAI && c < maxAPIRetries) {
        console.log(`generating question categories again. c = ${c}`);
        questionCategoriesFromAI = await generateAIResponse(
            systemPrompt,
            userPrompt
        );
        c++;
    }

    if (questionCategoriesFromAI && Array.isArray(questionCategoriesFromAI)) {
        questionCategoriesFromAI.forEach((q) => {
            allGeneratedQuestionCategories.push({
                ...q,
            });
        });
    }
    console.log(`\n--- Question Categories Successfully Generated.`);

    return allGeneratedQuestionCategories;
};

/**
 * Generates questions (one question as of now; can be used to generate more) based on system prompt and students' submission.
 * @param {string} submission - student's submission.
 * @param {string} systemPrompt - systemPromptSpecificQuestionCategory is passed as the systemPrompt.
 * @param {JSON} questionCategory - a json object containing a questionCategory returned by AI.
 * @param {number} maxAPIRetries - the number of times the API is called incase of failure.
 */
const questionGenerationFromQuestionCategories = async (
    systemPrompt,
    userPrompt,
    questionCategory,
    maxAPIRetries
) => {
    let generatedQuestions = []; // storing all the generatedQuestions (only one for now; can be used to generate more).
    try {
        // Call the AI service. We assume it returns a ready-to-use array of objects.
        let questionsFromAI = await generateAIResponse(
            systemPrompt,
            userPrompt
        );

        // simple loop to try generation maxAPIRetries times incase of failure.
        let c = 0;
        while (!questionsFromAI && c < maxAPIRetries) {
            console.log(`generating questions again. c = ${c}`);
            questionsFromAI = await generateAIResponse(
                systemPrompt,
                userPrompt
            );
            c++;
        }

        // just making sure that questionsFromAI is populated & parsed into an array
        if (questionsFromAI && Array.isArray(questionsFromAI)) {
            questionsFromAI.forEach((q) => {
                generatedQuestions.push({
                    studentCode: submission.trim(), // Add the student's code
                    questionCategoryName: questionCategory.name,
                    questionCategoryDefinition: questionCategory.definition,
                    questionCategoryDirectives:
                        questionCategory.generation_directives,
                    ...q, // Spread the rest of the question fields(if any)
                });
            });
        }
    } catch (error) {
        console.error(
            `Failed to process submission:`,
            error.message
        );
    }

    // Writing to CSV, only used for notion.
    if (generatedQuestions.length > 0) {
        writeToCSV(CSVFILENAME, generatedQuestions);
    } else {
        console.log("No questions were generated, skipping CSV export.");
    }
};

/**
 * creates an exercise for a given user and assignment.
 * @param {*} userId - vunetid of the user requesting the exercise
 * @param {*} assignmentId - uuid of the assignment for which to create the exercise
 * @returns - the created exercise object
 */
const generateExercise = async (userId, assignmentId) => {
    const user = await User.findOne({ vuNetId: userId }, { _id: 0 });
    const assignment = await Assignment.findOne(
        { uuid: assignmentId },
        { _id: 0 }
    );
    const author = await findSubmission(user, assignment);

    const studentCode = await fetchStudentCode(
        author.email,
        assignment.identifier
    );

    const questionCategories = await questionCategoriesGeneration(
        studentCode,
        systemPromptQuestionCategories(3, 6),
        3 // max retries
    );

    let questions = [];

    let numberOfQuestions = 5;
    const typesCount = questionCategories.length;
    const base = Math.floor(numberOfQuestions / typesCount);
    const remainder = numberOfQuestions % typesCount;

    for (let i = 0; i < typesCount; i++) {
        const qt = questionCategories[i];
        const count = i === typesCount - 1 ? base + remainder : base;

        if (count <= 0) continue;

        const systemPromptText = systemPromptSpecificQuestionCategory(
            qt,
            count
        );
        const userPromptText = await userPrompt(studentCode);
        let questionsForType = await questionGenerationFromQuestionCategories(
            systemPromptText,
            userPromptText,
            qt,
            3 // max retries
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
        studentCode: studentCode,
    });
    return exercise;
};

module.exports = { generateExercise };

// Used for exercise.controllers.js
const User = require("../models/User.js");
const studentSubmission = require("./studentSubmission.js");

/**
 * Filters a question object to remove sensitive information and randomize answer order.
 * Combines the correct answer and other answers, shuffles them, and returns a filtered question object
 * with only the necessary fields for display to the user.
 * @param {Object} question - Question object from the Exercise model.
 * @returns {Object} Filtered question object with randomized answers and selected fields.
 */
const filterQuestion = (question) => {
    let availableAnswers = [question.correctAnswer, ...question.otherAnswers]
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
        // include ratings; normalize Map to plain object for JSON transport
        ratings: question.ratings instanceof Map ? Object.fromEntries(question.ratings) : question.ratings,
        userAnswers: question.userAnswers,
        timeSpent: question.timeSpent,
        status: question.status,
        correct: question.correct,
    };
    return filteredQuestion;
};

/**
 * Checks if a submission exists for the user and assignment, and if it meets the score threshold.
 * Uses helper functions to verify both the existence of the submission folder and the student's score.
 * @param {Object} author - Mongoose user object for the candidate author.
 * @param {Object} assignment - Mongoose assignment object with assignment details.
 * @returns {boolean} True if the submission exists and meets the score threshold, false otherwise.
 */
const validSubmission = async (author, assignment) => {
    // Only check in the correct group folder for this author
    const hasSubmission = await studentSubmission.doesSubmissionFolderExist(
        assignment.identifier,
        author.email,
        author.studyParticipation
    );

    const validStudentScore = await studentSubmission.checkStudentScore(
        assignment.identifier,
        author.email,
    );

    return hasSubmission && validStudentScore;
};

/**
 * Randomly shuffles an array of candidate objects using the Fisher-Yates algorithm.
 * Returns a new array with the candidates in randomized order.
 * @param {Array<Object>} candidates - Array of candidate objects to shuffle.
 * @returns {Array<Object>} Shuffled array of candidates.
 */
const shuffleCandidates = (candidates) => {
    const result = [...candidates];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

/**
 * Finds a suitable submission author for a given user and assignment.
 * For study group A, prefers the user themselves if they have a valid submission, otherwise searches other students.
 * For study group B, searches other students first, then falls back to the user if no valid submission is found.
 * Returns the author user object who has a valid submission for the assignment.
 * @param {Object} user - The user requesting the exercise.
 * @param {Object} assignment - The assignment for which to find a submission author.
 * @returns {Object|null} The author user object with a valid submission, or null if none found.
 */
const findAuthor = async (user, assignment) => {
    let author = null;
    const users = await User.find(
        {
            role: "student",
            vuNetId: { $ne: user.vuNetId },
        },
        { _id: 0 }
    );
    const candidates = shuffleCandidates(users);

    // Helper to check valid submission in a specific group
    const validSubmissionInGroup = async (candidate, group) => {
        return await validSubmission({
            ...candidate,
            studyParticipation: group,
        }, assignment);
    };

    // Selection policy:
    // - If user.studyGroup === 'A': prefer the user's own submission first;
    //   if none, consider other students (shuffled) and pick the first valid.
    // - If user.studyGroup === 'B': consider other students first (shuffled);
    //   if none valid, fall back to the user's own submission.
    const shuffled = shuffleCandidates(users);

    // Partition candidates by studyParticipation so we can enforce the rule:
    // participants (studyParticipation: true) must only consider other participants.
    const samePart = shuffled.filter((c) => c.studyParticipation === user.studyParticipation);
    const otherPart = shuffled.filter((c) => c.studyParticipation !== user.studyParticipation);

    const tryCandidates = async (list) => {
        for (const candidate of list) {
            if (candidate.email === user.email) continue;
            if (await validSubmission(candidate, assignment)) {
                return candidate;
            }
        }
        return null;
    };

    if (user.studyGroup === "A") {
        // A: prefer own submission first
        if (await validSubmission(user, assignment)) {
            author = user;
        } else {
            // For participants, only consider same-participation candidates
            author = await tryCandidates(samePart);
            // If no author found and user is non-participant, allow other-participation fallback
            if (!author && user.studyParticipation === false) {
                author = await tryCandidates(otherPart);
            }
        }
    } else {
        // B: prefer others first
        // For participants, only consider same-participation candidates
        author = await tryCandidates(samePart);
        // If none and user is non-participant, consider other-participation candidates
        if (!author && user.studyParticipation === false) {
            author = await tryCandidates(otherPart);
        }
        // Finally, fall back to user's own submission
        if (!author && await validSubmission(user, assignment)) {
            author = user;
        }
    }

    console.log("findAuthor result:", { requester: user.vuNetId, studyGroup: user.studyGroup, studyParticipation: user.studyParticipation, author: author ? author.vuNetId : null });
    return author;
};

module.exports = {
    findAuthor,
    filterQuestion,
};

// Used for exercise.controllers.js
const User = require("../models/User.js");
const { doesSubmissionFolderExist } = require("./studentSubmission.js");
const { checkStudentScore } = require("./studentSubmission.js");

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
        userAnswers: question.userAnswers,
        timeSpent: question.timeSpent,
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
    const hasSubmission = await doesSubmissionFolderExist(
        assignment.identifier,
        author.email
    );

    const validStudentScore = await checkStudentScore(
        assignment.identifier,
        author.email
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
    for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
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
    let author;
    const users = await User.find(
        {
            role: "student",
            vuNetId: { $ne: user.vuNetId },
        },
        { _id: 0 }
    );
    const candidates = shuffleCandidates(users);
    console.log("candidates", candidates.map((c) => c.vuNetId).join(", "));
    // study group A is self, study group B is others
    if (user.studyGroup === "A") {
        author = user;
        if (!(await validSubmission(author, assignment))) {
            // try to find a submission from other participants (random order)
            for (const candidate of candidates) {
                if (await validSubmission(candidate, assignment)) {
                    author = candidate;
                    break;
                }
            }
        }
    } else {
        // First, try to find a submission from other participants (random order)
        for (const candidate of candidates) {
            if (await validSubmission(candidate, assignment)) {
                author = candidate;
                break;
            }
        }

        // If no other participant had a submission, finally try the current user as a fallback
        if (!author) {
            if (await validSubmission(user, assignment)) {
                author = user;
            }
        }
    }
    return author;
};

module.exports = {
    findAuthor,
    filterQuestion,
};

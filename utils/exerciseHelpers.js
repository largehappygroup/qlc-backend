// Used for exercise.controllers.js
const User = require("../models/User.js");
const { doesSubmissionFolderExist } = require("./studentSubmission.js");
const { checkStudentScore } = require("./studentSubmission.js");

/**
 * shuffles the available answers and filters out sensitive information from a question object.
 * @param {*} question - question object from Exercise model
 * @returns filtered question object
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
 * checks that the submission exists for the user and it met the score threshold
 * @param {*} author - mongoose user object for potential candidate
 * @param {*} assignment - mongoose assignment object with details
 * @returns - boolean, true if we can use the submission
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
 * randomly shuffles an array of candidates
 * @param {*} candidates
 * @returns
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
 * finds a suitable submission author for the given user and assignment.
 * @param {*} user - the user requesting the exercise
 * @param {*} assignment - the assignment for which to find a submission
 * @returns the author user object
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

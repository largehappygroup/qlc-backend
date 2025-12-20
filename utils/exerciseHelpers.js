// Used for exercise.controllers.js 
const User = require("../models/User.js");
const { doesSubmissionFolderExist } = require("./studentCode.js");

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
 * finds a suitable submission author for the given user and assignment.
 * @param {*} user - the user requesting the exercise
 * @param {*} assignment - the assignment for which to find a submission
 * @returns the author user object
 */
const findSubmission = async (user, assignment) => {
    let author;
    // study group A is self, study group B is others
    if (!user.studyParticipation || user.studyGroup === "A") {
        author = user;
        const hasSubmission = await doesSubmissionFolderExist(
            assignment.identifier,
            user.email
        );

        if (!hasSubmission) {
            const usersInStudy = await User.find(
                {
                    studyParticipation: true,
                    vuNetId: { $ne: user.vuNetId },
                },
                { _id: 0 }
            );
            const candidates = [...usersInStudy];
            for (let i = candidates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
            }
            // ...existing code...
            // First, try to find a submission from other participants (random order)
            for (const candidate of candidates) {
                const hasSubmission = await doesSubmissionFolderExist(
                    assignment.identifier,
                    candidate.email
                );
                if (hasSubmission) {
                    author = candidate;
                    break;
                }
            }
        }
    } else {
        const usersInStudy = await User.find(
            {
                studyParticipation: true,
                vuNetId: { $ne: user.vuNetId },
            },
            { _id: 0 }
        );
        const candidates = usersInStudy.sort(() => Math.random() - 0.5); // create a copy
        // First, try to find a submission from other participants (random order)
        for (const candidate of candidates) {
            const hasSubmission = await doesSubmissionFolderExist(
                assignment.identifier,
                candidate.email
            );
            if (hasSubmission) {
                author = candidate;
                break;
            }
        }

        // If no other participant had a submission, finally try the current user as a fallback
        if (!author) {
            const hasSubmission = await doesSubmissionFolderExist(
                assignment.identifier,
                user.email
            );
            if (hasSubmission) {
                author = user;
            }
        }
    }
    return author;
};

module.exports = {
    findSubmission,
    filterQuestion,
};

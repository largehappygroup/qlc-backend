// Basic tests for studentSubmission and exerciseHelpers logic
const { getSubmission, getStudentJavaFiles, doesSubmissionFolderExist, checkStudentScore } = require('../utils/studentSubmission');
const { findAuthor, filterQuestion } = require('../utils/exerciseHelpers');
const User = require('../models/User');
const assert = require('assert');

describe('Student Submission Logic', () => {
    it('should return false for non-existent submission folder', async () => {
        const exists = await doesSubmissionFolderExist('PA99-X', 'fakeuser@example.com', true);
        assert.strictEqual(exists, false);
    });

    it('should return empty array for non-existent java files', async () => {
        const files = await getStudentJavaFiles('PA99-X', 'fakeuser@example.com', true);
        assert.deepStrictEqual(files, []);
    });

    it('should return empty string for non-existent submission', async () => {
        const submission = await getSubmission('fakeuser@example.com', 'PA99-X', true);
        assert.strictEqual(submission, '');
    });
});

describe('Exercise Helpers', () => {
    it('should filter question and randomize answers', () => {
        const question = {
            _id: '1', uuid: 'uuid', query: 'Q?', type: 'mc', hints: [], topics: [], explanation: '',
            correctAnswer: 'A', otherAnswers: ['B', 'C', 'D'], userAnswers: [], timeSpent: 0, correct: false
        };
        const filtered = filterQuestion(question);
        assert(filtered.availableAnswers.includes('A'));
        assert(filtered.availableAnswers.length === 4);
    });
});

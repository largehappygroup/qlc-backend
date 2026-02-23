// Test for findAuthor logic
const { findAuthor } = require("../utils/exerciseHelpers");
const User = require("../models/User");
const assert = require("assert");

describe("findAuthor logic", () => {
    let origFind;
    let studentSubmission;

    before(() => {
        // stub studentSubmission helpers and default User.find to avoid DB access
        studentSubmission = require("../utils/studentSubmission");
        origFind = User.find;
        User.find = async () => [];
    });

    after(() => {
        User.find = origFind;
    });

    afterEach(() => {
        // restore stubs on studentSubmission
        if (studentSubmission) {
            delete studentSubmission.doesSubmissionFolderExist;
            delete studentSubmission.checkStudentScore;
        }
        // reset default User.find to empty for isolation
        User.find = async () => [];
    });

    it("should return null if no valid author exists", async () => {
        // Simulate a user and assignment with no valid submissions
        const user = {
            email: "fakeuser@example.com",
            studyParticipation: true,
            studyGroup: "A",
            vuNetId: "fakeuser",
        };
        const assignment = { identifier: "PA99-X" };
        const author = await findAuthor(user, assignment);
        assert.strictEqual(author, null);
    });

    it("participant A should get own submission if valid", async () => {
        const user = {
            email: "ua@example.com",
            studyParticipation: true,
            studyGroup: "A",
            vuNetId: "ua",
        };
        const assignment = { identifier: "PA01" };
        // other users
        User.find = async () => [
            {
                email: "ub@example.com",
                studyParticipation: true,
                studyGroup: "A",
                vuNetId: "ub",
            },
            {
                email: "nc@example.com",
                studyParticipation: false,
                studyGroup: "B",
                vuNetId: "nc",
            },
        ];
        studentSubmission.doesSubmissionFolderExist = async (
            _,
            email,
            studyParticipation,
        ) => email === "ua@example.com";
        studentSubmission.checkStudentScore = async (_, email) =>
            email === "ua@example.com";

        const author = await findAuthor(user, assignment);
        assert.strictEqual(author.vuNetId, "ua");
    });

    it("participant A should pick another participant if own missing", async () => {
        const user = {
            email: "ua2@example.com",
            studyParticipation: true,
            studyGroup: "A",
            vuNetId: "ua2",
        };
        const assignment = { identifier: "PA02" };
        User.find = async () => [
            {
                email: "ub2@example.com",
                studyParticipation: true,
                studyGroup: "A",
                vuNetId: "ub2",
            },
            {
                email: "nc2@example.com",
                studyParticipation: false,
                studyGroup: "B",
                vuNetId: "nc2",
            },
        ];
        studentSubmission.doesSubmissionFolderExist = async (
            _,
            email,
            studyParticipation,
        ) => email === "ub2@example.com";
        studentSubmission.checkStudentScore = async (_, email) =>
            email === "ub2@example.com";

        const author = await findAuthor(user, assignment);
        assert.strictEqual(author.vuNetId, "ub2");
    });

    it("participant should NOT consider non-participant candidates", async () => {
        const user = {
            email: "ua3@example.com",
            studyParticipation: true,
            studyGroup: "A",
            vuNetId: "ua3",
        };
        const assignment = { identifier: "PA03" };
        User.find = async () => [
            {
                email: "nc3@example.com",
                studyParticipation: false,
                studyGroup: "B",
                vuNetId: "nc3",
            },
        ];
        // only non-participant has valid submission
        studentSubmission.doesSubmissionFolderExist = async (
            _,
            email,
            studyParticipation,
        ) => email === "nc3@example.com";
        studentSubmission.checkStudentScore = async (_, email) =>
            email === "nc3@example.com";

        const author = await findAuthor(user, assignment);
        assert.strictEqual(author, null);
    });

    it("non-participant A should prefer own then others", async () => {
        const user = {
            email: "na@example.com",
            studyParticipation: false,
            studyGroup: "A",
            vuNetId: "na",
        };
        const assignment = { identifier: "PA04" };
        User.find = async () => [
            {
                email: "nb@example.com",
                studyParticipation: false,
                studyGroup: "A",
                vuNetId: "nb",
            },
            {
                email: "pc@example.com",
                studyParticipation: true,
                studyGroup: "A",
                vuNetId: "pc",
            },
        ];
        // own missing, other non-participant has valid
        studentSubmission.doesSubmissionFolderExist = async (
            _,
            email,
            studyParticipation,
        ) => email === "nb@example.com";
        studentSubmission.checkStudentScore = async (_, email) =>
            email === "nb@example.com";

        const author = await findAuthor(user, assignment);
        assert.strictEqual(author.vuNetId, "nb");
    });

    it("participant B should prefer other participants then own", async () => {
        const user = {
            email: "pb@example.com",
            studyParticipation: true,
            studyGroup: "B",
            vuNetId: "pb",
        };
        const assignment = { identifier: "PA05" };
        User.find = async () => [
            {
                email: "pc1@example.com",
                studyParticipation: true,
                studyGroup: "B",
                vuNetId: "pc1",
            },
        ];
        // other participant invalid, own valid
        studentSubmission.doesSubmissionFolderExist = async (
            _,
            email,
            studyParticipation,
        ) => email === "pb@example.com";
        studentSubmission.checkStudentScore = async (_, email) =>
            email === "pb@example.com";

        const author = await findAuthor(user, assignment);
        assert.strictEqual(author.vuNetId, "pb");
    });
});

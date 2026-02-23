const fs = require("fs");
const path = require("path");
/**
 * Returns the absolute path to the submissions directory for a given assignment.
 * Used to locate where student submissions are stored for a specific assignment.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @returns {string} Absolute path to the submissions directory for the assignment.
 */
const getSubmissionsDir = (assignmentIdentifier, studyParticipation) => {
    return path.join(
        __dirname,
        "..",
        "assignment-submissions",
        assignmentIdentifier,
        `${studyParticipation ? "include-" : "not-include-"}submissions`,
    );
};

// Returns the most recent submission folder for a student, searching both include and not-include folders if needed
const findLatestSubmissionFolderFlexible = async (
    assignmentIdentifier,
    studentEmail,
    studyParticipation
) => {
    // Try the preferred group first
    let folder = await findLatestSubmissionFolder(
        assignmentIdentifier,
        studentEmail,
        studyParticipation
    );
    if (folder) return folder;
    // Fallback: try the other group
    folder = await findLatestSubmissionFolder(
        assignmentIdentifier,
        studentEmail,
        !studyParticipation
    );
    return folder;
};

/**
 * Finds the most recent submission folder for a student in an assignment's submissions directory.
 * Searches for directories matching the student's email prefix and returns the one with the latest modification time.
 * Returns null if no matching folder is found or the directory does not exist.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @param {string} studentEmail - The email of the student.
 * @param {boolean} studyParticipation - Whether the student participated in the study.
 * @returns {Promise<string|null>} Absolute path to the most recent submission folder, or null if not found.
 */
const findLatestSubmissionFolder = async (
    assignmentIdentifier,
    studentEmail,
    studyParticipation,
) => {
    const submissionsDir = getSubmissionsDir(assignmentIdentifier, studyParticipation);

    let dirStat;
    try {
        dirStat = await fs.promises.stat(submissionsDir);
    } catch (err) {
        // Directory does not exist
        return null;
    }
    if (!dirStat.isDirectory()) {
        return null;
    }

    const entries = await fs.promises.readdir(submissionsDir, {
        withFileTypes: true,
    });

    const candidateDirs = entries
        .filter((d) => d.isDirectory() && d.name.startsWith(`${studentEmail}-`))
        .map((d) => path.join(submissionsDir, d.name));

    if (candidateDirs.length === 0) {
        return null;
    }

    // pick the directory with the most recent mtime
    let latestDir = null;
    let latestMtime = 0;
    await Promise.all(
        candidateDirs.map(async (dirPath) => {
            const s = await fs.promises.stat(dirPath);
            const mtimeMs = s.mtimeMs || s.ctimeMs || 0;
            if (mtimeMs > latestMtime) {
                latestMtime = mtimeMs;
                latestDir = dirPath;
            }
        }),
    );

    return latestDir;
};

/**
 * Retrieves all .java files from a folder, optionally recursing into subdirectories.
 * Returns an array of absolute file paths for each .java file found.
 * @param {string} folderPath - The path to the folder to search.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.recursive=false] - Whether to search subdirectories recursively.
 * @returns {Promise<string[]>} Array of absolute file paths for .java files.
 */
const getJavaFilesFromFolder = async (folderPath, options = {}) => {
    const { recursive = false } = options;
    const results = [];

    const walk = async (currentPath) => {
        const entries = await fs.promises.readdir(currentPath, {
            withFileTypes: true,
        });
        for (const entry of entries) {
            const entryPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                if (recursive) await walk(entryPath);
                continue;
            }
            if (
                entry.isFile() &&
                path.extname(entry.name).toLowerCase() === ".java"
            ) {
                results.push(entryPath);
            }
        }
    };

    await walk(folderPath);
    return results;
};

/**
 * Reads all .java files for the latest submission of a given student and assignment.
 * Returns an array of objects containing filename, path, and file content for each .java file found.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @param {string} studentEmail - The email of the student.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.recursive=false] - Whether to search subdirectories recursively.
 * @returns {Promise<Array<{filename:string, path:string, content:string}>>} Array of file info objects.
 */
const getStudentJavaFiles = async (
    assignmentIdentifier,
    studentEmail,
    studyParticipation,
    options = {},
) => {
    const latestFolder = await findLatestSubmissionFolderFlexible(
        assignmentIdentifier,
        studentEmail,
        studyParticipation
    );
    if (!latestFolder) {
        // No submission folder found
        return [];
    }
    const javaFilePaths = await getJavaFilesFromFolder(latestFolder, options);

    if (javaFilePaths.length === 0) {
        // no .java files found in the latest submission folder
        return [];
    }

    const fileReads = await Promise.all(
        javaFilePaths.map(async (p) => {
            const content = await fs.promises.readFile(p, "utf8");
            return {
                filename: path.basename(p),
                path: p,
                content,
            };
        }),
    );

    return fileReads;
};

/**
 * Fetches and concatenates all .java files for a student's latest submission for a given assignment.
 * Returns a single string with file boundaries clearly marked, or an empty string if no files are found.
 * @param {string} studentEmail - The email of the student.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.recursive=false] - Whether to search subdirectories recursively.
 * @returns {Promise<string>} Concatenated string of all .java file contents, or empty string if none found.
 */
const getSubmission = async (
    studentEmail,
    assignmentIdentifier,
    studyParticipation,
    options = {},
) => {
    const files = await getStudentJavaFiles(
        assignmentIdentifier,
        studentEmail,
        studyParticipation,
        options,
    );
    if (files.length === 0) return "";

    // join files with clear separators so the consumer can see file boundaries
    return files
        .map((f) => `// ===== File: ${f.filename} =====\n${f.content.trim()}\n`)
        .join("\n");
};

/**
 * Checks if a submission folder exists for a given student and assignment.
 * Returns true if a valid submission folder is found, false otherwise.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @param {string} studentEmail - The email of the student.
 * @returns {Promise<boolean>} True if the folder exists, false otherwise.
 */
const doesSubmissionFolderExist = async (
    assignmentIdentifier,
    studentEmail,
    studyParticipation
) => {
    const folderPath = await findLatestSubmissionFolderFlexible(
        assignmentIdentifier,
        studentEmail,
        studyParticipation
    );
    return !!folderPath; // Return true if a folder path is found
};

/**
 * Checks if a student's score for a given assignment meets the required threshold (>= 75%).
 * Reads the assignment's CSV file, locates the student's row, and calculates the correctness percentage.
 * Returns true if the student meets the threshold, false otherwise.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @param {string} studentEmail - The email of the student.
 * @returns {Promise<boolean>} True if the student's score is >= 75%, false otherwise.
 */
const checkStudentScore = async (assignmentIdentifier, studentEmail) => {
    try {
        const submissionsDir = path.join(
            __dirname,
            "..",
            "assignment-submissions",
            assignmentIdentifier,
        );
        const files = await fs.promises.readdir(submissionsDir);
        const csvFile = files.find((f) => f.toLowerCase().endsWith(".csv"));
        if (!csvFile) return false;
        const csvPath = path.join(submissionsDir, csvFile);
        const data = await fs.promises.readFile(csvPath, "utf8");
        const lines = data.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) return false; // no data

        // Parse header row to find relevant columns
        const headers = lines[0].split(",").map((h) => h.trim());
        const usernameIdx = headers.findIndex(
            (h) => h.toLowerCase() === "username",
        );
        const totalIdx = headers.findIndex(
            (h) => h.toLowerCase() === "correctness total",
        );
        const possibleIdx = headers.findIndex(
            (h) => h.toLowerCase() === "correctness total possible",
        );
        if (usernameIdx === -1 || totalIdx === -1 || possibleIdx === -1)
            return false;

        // Find the student's row and calculate percentage
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",").map((cell) => cell.trim());
            if (row[usernameIdx] === studentEmail) {
                const total = parseFloat(row[totalIdx]);
                const possible = parseFloat(row[possibleIdx]);
                if (isNaN(total) || isNaN(possible) || possible === 0)
                    return false;
                const percent = (total / possible) * 100;
                return percent >= 75;
            }
        }
        return false; // student not found
    } catch (err) {
        return false;
    }
};

module.exports = {
    getSubmission,
    getStudentJavaFiles,
    doesSubmissionFolderExist,
    checkStudentScore,
    getSubmissionsDir,
    findLatestSubmissionFolderFlexible,
};

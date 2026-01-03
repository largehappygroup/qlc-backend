const fs = require("fs");
const path = require("path");
/**
 * Get the submissions directory for an assignment
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A)
 * @returns {string}
 */
const getSubmissionsDir = (assignmentIdentifier) =>
    path.join(__dirname, "../..", "assignment-submissions", assignmentIdentifier, "submissions");

/**
 * Find the most recent submission folder for a student in an assignment's submissions dir.
 * Looks for directories that start with `${studentEmail}-` and returns the path of the directory
 * with the most recent mtime.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A)
 * @param {string} studentEmail
 * @returns {Promise<string>} absolute path to the most recent submission folder
 * @throws {Error} if submissions dir or matching folder not found
 */
const findLatestSubmissionFolder = async (assignmentIdentifier, studentEmail) => {
    const submissionsDir = getSubmissionsDir(assignmentIdentifier);

    let dirStat;
    try {
        dirStat = await fs.promises.stat(submissionsDir);
    } catch (err) {
        throw new Error(`Submissions directory not found: ${submissionsDir}`);
    }
    if (!dirStat.isDirectory()) {
        throw new Error(
            `Submissions path is not a directory: ${submissionsDir}`
        );
    }

    const entries = await fs.promises.readdir(submissionsDir, {
        withFileTypes: true,
    });

    const candidateDirs = entries
        .filter((d) => d.isDirectory() && d.name.startsWith(`${studentEmail}-`))
        .map((d) => path.join(submissionsDir, d.name));

    if (candidateDirs.length === 0) {
        throw new Error(
            `No submission folders found for student "${studentEmail}" in ${submissionsDir}`
        );
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
        })
    );

    return latestDir;
};

/**
 * Get all .java files from a folder. Optionally recurse into subdirectories.
 * @param {string} folderPath
 * @param {object} [options]
 * @param {boolean} [options.recursive=false]
 * @returns {Promise<string[]>} array of absolute file paths
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
 * Read all .java files for the latest submission of a given student and assignment.
 * Returns an array of { filename, path, content } objects.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A)
 * @param {string} studentEmail
 * @param {object} [options]
 * @param {boolean} [options.recursive=false]
 * @returns {Promise<Array<{filename:string, path:string, content:string}>>}
 */
const getStudentJavaFiles = async (
    assignmentIdentifier,
    studentEmail,
    options = {}
) => {
    const latestFolder = await findLatestSubmissionFolder(
        assignmentIdentifier,
        studentEmail
    );
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
        })
    );

    return fileReads;
};

/**
 * Convenience function to fetch concatenated student code (all .java files).
 * If no files are found this returns an empty string.
 * @param {string} studentEmail
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A)
 * @param {object} [options]
 * @param {boolean} [options.recursive=false]
 * @returns {Promise<string>}
 */
const fetchStudentCode = async (studentEmail, assignmentIdentifier, options = {}) => {
    const files = await getStudentJavaFiles(
        assignmentIdentifier,
        studentEmail,
        options
    );
    if (files.length === 0) return "";

    // join files with clear separators so the consumer can see file boundaries
    return files
        .map(
            (f) =>
                `// ===== File: ${f.filename} =====\n${f.content.trim()}\n`
        )
        .join("\n");
};

/**
 * Checks if a submission folder exists for a given student and assignment.
 * @param {string} assignmentIdentifier - The identifier of the assignment (e.g., PA06-A).
 * @param {string} studentEmail - The email of the student.
 * @returns {Promise<boolean>} True if the folder exists, false otherwise.
 */
const doesSubmissionFolderExist = async (assignmentIdentifier, studentEmail) => {
    try {
        const folderPath = await findLatestSubmissionFolder(assignmentIdentifier, studentEmail);
        return !!folderPath; // Return true if a folder path is found
    } catch (error) {
        return false; // Return false if an error occurs (e.g., folder not found)
    }
};

const checkStudentScore = async (assignmentIdentifier, studentEmail) => {
    try {
        const submissionsDir = path.join(
            __dirname,
            "../..",
            "assignment-submissions",
            assignmentIdentifier
        );
        const files = await fs.promises.readdir(submissionsDir);
        const csvFile = files.find(f => f.toLowerCase().endsWith('.csv'));
        if (!csvFile) return false;
        const csvPath = path.join(submissionsDir, csvFile);
        const data = await fs.promises.readFile(csvPath, "utf8");
        const lines = data.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) return false; // no data

        // Parse header
        const headers = lines[0].split(",").map(h => h.trim());
        const usernameIdx = headers.findIndex(h => h.toLowerCase() === "username");
        const totalIdx = headers.findIndex(h => h.toLowerCase() === "correctness total");
        const possibleIdx = headers.findIndex(h => h.toLowerCase() === "correctness total possible");
        if (usernameIdx === -1 || totalIdx === -1 || possibleIdx === -1) return false;

        // Find student row
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",").map(cell => cell.trim());
            if (row[usernameIdx] === studentEmail) {
                const total = parseFloat(row[totalIdx]);
                const possible = parseFloat(row[possibleIdx]);
                if (isNaN(total) || isNaN(possible) || possible === 0) return false;
                const percent = (total / possible) * 100;
                return percent >= 75;
            }
        }
        return false; // student not found
    } catch (err) {
        return false;
    }
}

module.exports = {
    fetchStudentCode,
    getStudentJavaFiles,
    doesSubmissionFolderExist,
    checkStudentScore,
};
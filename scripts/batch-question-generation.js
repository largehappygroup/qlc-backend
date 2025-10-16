require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { systemPrompt } = require("../utils/prompt_question_types");
const { generateQuestions } = require("../services/QuestionGeneration");
// const { studentSubmissions, contextArray } = require("./dummy-data");
const { helenSubmimssion, helenContext } = require("./dummy-data");

/**
 * Converts an array of question objects into a CSV-formatted string.
 */
const convertToCSV = (questions) => {
  if (questions.length === 0) return "";

  const headers = Object.keys(questions[0]);
  const headerRow = headers.join(",");

  const dataRows = questions.map((q) => {
    return headers
      .map((header) => {
        let cell = q[header];
        if (Array.isArray(cell)) {
          // Convert array to a string, e.g., "Hint 1; Hint 2"
          cell = cell.join("; ");
        }
        const cellString = String(cell).replace(/"/g, '""'); // Escape double quotes
        return `"${cellString}"`;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

/**
 * Main function to process submissions and write to a CSV.
 * @param {Array<string>} submissions - An array of strings, where each string is a student's combined code.
 */
const processSubmissionsAndCreateCSV = async (
  submissions,
  systemPrompt,
  contextArray
) => {
  console.log(
    `--- Starting batch generation for ${submissions.length} code submissions ---`
  );
  const allGeneratedQuestions = [];

  for (const [index, code] of submissions.entries()) {
    try {
      console.log(`Processing submission #${index + 1}...`);

      const userPrompt = `
                ### Students' code:
                ${code}
    `;
      // Call the AI service. We assume it returns a ready-to-use array of objects.
      const questionsFromAI = await generateQuestions(systemPrompt, userPrompt);

      if (questionsFromAI && Array.isArray(questionsFromAI)) {
        questionsFromAI.forEach((q) => {
          allGeneratedQuestions.push({
            submissionIndex: index + 1,
            studentCode: code.trim(), // Add the student's code
            // context: contextArray[index],
            ...q, // Spread the rest of the question fields (questionText, difficulty, etc.)
          });
        });
        console.log(
          `  -> Successfully generated ${questionsFromAI.length} questions.`
        );
      }
    } catch (error) {
      console.error(
        `  -> ❌ Failed to process submission #${index + 1}:`,
        error.message
      );
    }
  }
  console.log(
    `\n--- Batch processing complete. Generated a total of ${allGeneratedQuestions.length} questions. ---`
  );
  console.log(allGeneratedQuestions);

  if (allGeneratedQuestions.length > 0) {
    try {
      const csvData = convertToCSV(allGeneratedQuestions);
      const filePath = path.join(__dirname, "bulk_generated_questions.csv");

      fs.writeFileSync(filePath, csvData, "utf8");
      console.log(`✅ Successfully saved all questions to: ${filePath}`);
    } catch (error) {
      console.error("❌ Error writing the CSV file:", error);
    }
  } else {
    console.log("No questions were generated, skipping CSV export.");
  }
};

// --- RUN THE SCRIPT ---
submissions = Array.from({ length: 1 }, () => helenSubmimssion[4]);
// console.log(submissions);
processSubmissionsAndCreateCSV(
  submissions,
  systemPrompt("Predict the output"),
  [helenContext[4]]
);

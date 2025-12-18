require("dotenv").config();
const fs = require("fs");
const path = require("path");

const CSVFILENAME = "batch_questions_generated.csv";
const maxAPIRetries = 3;

// loading a specific percentage of java-assignments from a json file
const javaAssingments = require("../scripts/sampling_datasets/sampled_assignments.json");
// const javaAssingments = require("/Users/kritanbhandari/Documents/QLCs/datasets_json/helen_submissions.json");

// system prompt to generate question categories
const {
  systemPromptQuestionCategories,
} = require("../utils/systemPromptQuestionCategories");

// system prompt to generate questions from a speicifc question category
const {
  systemPromptSpecificQuestionCategory,
} = require("../utils/promptFinalQuestion");

// generateAIResponse makes the api calls
const { generateAIResponse } = require("../services/responseGeneration");

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
 * @param {number} submissionIndex - the index of the submission. managed externally to track the number of submissions processed.
 * @param {string} submission - student's submission.
 * @param {string} systemPrompt - systemPromptSpecificQuestionCategory is passed as the systemPrompt.
 * @param {JSON} questionCategory - a json object containing a questionCategory returned by AI.
 * @param {number} maxAPIRetries - the number of times the API is called incase of failure.
 */
const questionGenerationFromQuestionCategories = async (
  submissionIndex,
  submission,
  systemPrompt,
  questionCategory,
  maxAPIRetries
) => {
  let generatedQuestions = []; // storing all the generatedQuestions (only one for now; can be used to generate more).
  try {
    console.log("specific question");
    const userPrompt = `
                Students' code:
                ${submission}
    `;

    // Call the AI service. We assume it returns a ready-to-use array of objects.
    let questionsFromAI = await generateAIResponse(systemPrompt, userPrompt);

    // simple loop to try generation maxAPIRetries times incase of failure.
    let c = 0;
    while (!questionsFromAI && c < maxAPIRetries) {
      console.log(`generating questions again. c = ${c}`);
      questionsFromAI = await generateAIResponse(systemPrompt, userPrompt);
      c++;
    }

    // just making sure that questionsFromAI is populated & parsed into an array
    if (questionsFromAI && Array.isArray(questionsFromAI)) {
      questionsFromAI.forEach((q) => {
        generatedQuestions.push({
          submissionIndex: submissionIndex,
          studentCode: submission.trim(), // Add the student's code
          questionCategoryName: questionCategory.name,
          questionCategoryDefinition: questionCategory.definition,
          questionCategoryDirectives: questionCategory.generation_directives,
          ...q, // Spread the rest of the question fields(if any)
        });
      });
    }
  } catch (error) {
    console.error(
      `Failed to process submission #${submissionIndex}:`,
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
 * Converts an array of question objects into a CSV-formatted string.
 * Only to later load in Notion.
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
 * Writes the generated questions to a csv file. Creates a new one if the fileName doesn't exist, otherwise appends to the fileName if exists.
 * @param {string} fileName - complete filename with extension (.csv) to store the generated questions.
 * @param {Array<string>} generatedQuestions - all the questions that were generated by the AI.
 */
const writeToCSV = (fileName, generatedQuestions) => {
  try {
    const csvData = convertToCSV(generatedQuestions);
    const filePath = path.join(__dirname, fileName);

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
      // 1. If file exists, append data without the header
      console.log(`File exists. Appending to: ${filePath}`);

      // Split data into lines and remove the header (the first line)
      const lines = csvData.split("\n");
      const dataWithoutHeader = lines.slice(1).join("\n");

      // Add a newline before the new data to separate it
      if (dataWithoutHeader) {
        fs.appendFileSync(filePath, "\n" + dataWithoutHeader, "utf8");
      }
    } else {
      // 2. If file does not exist, write the file normally (with header)
      console.log(`Creating new file: ${filePath}`);
      fs.writeFileSync(filePath, csvData, "utf8");
    }

    console.log(`Successfully saved all questions to: ${filePath}`);
  } catch (error) {
    console.error("Error writing the CSV file:", error);
  }
};

/**
 * Removes a file given it exists.
 * @param {string} fileName - the full name of the file along with its extension.
 */
const removeFileIfExists = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    fs.unlinkSync(filePath);
    console.log(`Removing file: ${fileName}`);
  }
};
// --- RUN THE SCRIPT ---
const run = async () => {
  // cleaning up prev csv.
  removeFileIfExists(CSVFILENAME);

  // keeping the functionality of selecting a subset of javaAssignments for some small testing.
  submissions = [];
  for (let i = 0; i < 3; i++) {
    submissionBeingProcessed = javaAssingments[i]["content"]; // extracting only the java portion of the json entries.
    submissions.push(submissionBeingProcessed);
  }

  submissionIndex = 1;
  for (const submission of submissions) {
    questionCategories = await questionCategoriesGeneration(
      // generating question category for each submission
      submission,
      systemPromptQuestionCategories(3, 6),
      maxAPIRetries
    );

    // generating question (one as of now) for each category; also writing to CSVFILENAME
    for (const questionCategory of questionCategories) {
      questionPrompt = systemPromptSpecificQuestionCategory(questionCategory);
      questionGenerationFromQuestionCategories(
        submissionIndex,
        submission,
        questionPrompt,
        questionCategory,
        maxAPIRetries
      );
    }
    submissionIndex += 1;
  }
};

run();

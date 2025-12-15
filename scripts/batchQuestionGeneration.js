require("dotenv").config();
const fs = require("fs");
const path = require("path");
const onlineJavaAssignment = require("/Users/kritanbhandari/Documents/QLCs/datasets_json/helen_submissions.json");

const {
  systemPromptQuestionCategories,
} = require("../utils/systemPromptQuestionCategories");
const {
  systemPromptSpecificQuestionType,
} = require("../utils/promptFinalQuestion");

const { generateQuestions } = require("../services/QuestionGeneration");
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
const questionTypeGeneration = async (submission, systemPrompt) => {
  let allGeneratedQuestions = [];
  const userPrompt = `
            ### Students' code:
            ${submission}
  `;

  // Call the AI service. We assume it returns a ready-to-use array of objects.
  const questionsFromAI = await generateQuestions(systemPrompt, userPrompt);

  console.log(`\n--- Batch processing complete.`);
  if (questionsFromAI && Array.isArray(questionsFromAI)) {
    questionsFromAI.forEach((q) => {
      allGeneratedQuestions.push({
        ...q,
      });
    });
  }
  return allGeneratedQuestions;
};

const questionGenerationFromQuestionTypes = async (
  i,
  submissions,
  systemPrompt,
  questionType
) => {
  console.log(
    `--- Starting batch generation for ${submissions.length} code submissions ---`
  );
  let allGeneratedQuestions = [];

  for (const [index, code] of submissions.entries()) {
    try {
      console.log(`Processing submission #${index + 1}...`);
      const userPrompt = `
                ### Students' code:
                ${code}
    `;

      // Call the AI service. We assume it returns a ready-to-use array of objects.
      const questionsFromAI = await generateQuestions(systemPrompt, userPrompt);

      let c = 0;

      while (c != 3 && !questionsFromAI) {
        questionsFromAI = await generateQuestions(systemPrompt, userPrompt);
        c++;
      }

      if (questionsFromAI && Array.isArray(questionsFromAI)) {
        questionsFromAI.forEach((q) => {
          allGeneratedQuestions.push({
            submissionIndex: i,
            studentCode: code.trim(), // Add the student's code
            questionTypeName: questionType.name,
            questionTypeDefinition: questionType.definition,
            questionTypeDirectives: questionType.generation_directives,
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
  // console.log(allGeneratedQuestions);

  if (allGeneratedQuestions.length > 0) {
    try {
      const csvData = convertToCSV(allGeneratedQuestions);
      const filePath = path.join(__dirname, "bulk_generated_questions2.csv");

      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        // 1. If file exists, append data *without* the header
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

      console.log(`✅ Successfully saved all questions to: ${filePath}`);
    } catch (error) {
      console.error("❌ Error writing the CSV file:", error);
    }
  } else {
    console.log("No questions were generated, skipping CSV export.");
  }
};

// --- RUN THE SCRIPT ---

// checking if file exisits and removing it
const filePath = path.join(__dirname, "bulk_generated_questions2.csv");
const fileExists = fs.existsSync(filePath);
if (fileExists) {
  fs.unlinkSync(filePath);
}

// submissionBeingProcessed = helenSubmimssion[3];
// submissionBeingProcessed = onlineJavaAssignment[0]["content"];
submissions = [];
for (let i = 0; i < 3; i++) {
  submissionBeingProcessed = onlineJavaAssignment[i]["content"];
  submissions.push(submissionBeingProcessed);
}

const a = async () => {
  i = 1;
  for (const submission of submissions) {
    questionTypes = await questionTypeGeneration(
      submission,
      systemPromptQuestionCategories()
    );
    _submissions = Array.from({ length: 1 }, () => submission);
    for (const questionType of questionTypes) {
      questionPrompt = systemPromptSpecificQuestionType(questionType);
      questionGenerationFromQuestionTypes(
        i,
        _submissions,
        questionPrompt,
        questionType
      );
    }
    i += 1;
  }
};
a();

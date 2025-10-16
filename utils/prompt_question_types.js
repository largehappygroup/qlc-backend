const fs = require("fs");
const path = require("path");

const Chapter = require("../models/Chapter.js");
const ChapterAssignment = require("../models/ChapterAssignment.js");

const questionTypes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "question_types.json"), "utf8")
);
/**
 * Fetches and compiles background context for a given assignment, including details about the assignment itself and its parent chapter, from the database.
 * @param {string} assignmentId - The MongoDB ObjectId of the assignment.
 * @returns {Promise<string>} A formatted string containing the combined chapter and assignment details.
 * @throws {Error} Throws an error if the assignment or chapter cannot be found.
 */
const fetchAssignmentAndChaptertDetails = async (assignmentId) => {
  // Assignment details
  try {
    const chapterAssignmentDetails = await ChapterAssignment.findById(
      assignmentId
    ).select("title instructions chapterId");

    if (!chapterAssignmentDetails) {
      throw new Error("Assignment not found.");
    }

    const {
      title: assignmentTitle,
      instructions: assignmentInstruction,
      chapterId,
    } = chapterAssignmentDetails;

    // Chapter details
    const chapterDetails = await Chapter.findById(chapterId).select(
      "learningObjectives title description"
    );

    if (!chapterDetails) {
      throw new Error("Chapter not found.");
    }

    const {
      learningObjectives: chapterLearningObjectives,
      title: chapterTitle,
      description: chapterDescription,
    } = chapterDetails;

    return `
      Chapter Details: 
        - Chapter Title: ${chapterTitle}
        - Chapter Description:${chapterDescription}
        - Learning Objectives: ${chapterLearningObjectives}

    Assignment Details: 
        - Assignment Title: ${assignmentTitle}
        - Assignment Instructions: ${assignmentInstruction}
    `;
  } catch (error) {
    throw error;
  }
};

/**
 * Generates the system promp based on various question types.
 * @returns {string} A detailed instruction string, formatted and ready to be sent to the AI.
 */
const systemPrompt = () => {
  const incorrectAnswers = 3;
  const maxNumberOfHints = 3;
  const questionStructure = ["multiple-choice", "coding"][0]; // only dealing with MCQs at the moment
  const numberOfQuestions = 5;

  const questionType = "Method Relationship: Direct Call";
  const questionTypeInfo = questionTypes[questionType];

  // Format the generation directives into a bulleted list string
  const directivesString = questionTypeInfo.generation_directives
    .map((directive) => `- ${directive}`)
    .join("\n");

  return `
Your primary task is to analyze the provided student code and generate questions related to the student's code.  
Focus your questions strictly on the **${questionType}** question type, as described below. 

### ${questionType}
**Definition:** ${questionTypeInfo.definition}

**Generation Directives (FOLLOW STRICTLY):**
${directivesString}

### Output Instructions
For each question you generate, you must provide the following in a structured format:

1.  **A ${questionStructure} Question:** The question must be a "${questionType}" type and be directly related to the provided student's code.
2.  **Answer Options:** Provide one clearly correct answer and ${incorrectAnswers} plausible but incorrect answers.
3.  **Explanation:** For the correct answer, provide a concise explanation of why it is correct, referencing the student's code if necessary.
4.  **Hints:** You must provide ${maxNumberOfHints} hints. The first hint must explain why the first incorrect answer is wrong. The second hint must explain why the second incorrect answer is wrong, and the third hint must explain why the third incorrect answer is wrong. Make the hints objective statements.

Your response must be a valid JSON array containing ${numberOfQuestions} question objects. Return only the raw JSON and nothing else. Do not wrap the response in markdown code fences. Do not include any text before or after the JSON array.
Each object in the array must follow this exact structure:
[
  {
      "questionText": "String",
      "correctAnswer": "String",
      "otherAnswers": ["List of ${incorrectAnswers} Strings"],
      "explanation": "String",
      "hints": ["List of ${maxNumberOfHints} Strings"],
  }
]

Before generating the final JSON, you must perform a final check to ensure every Generation Directive has been strictly followed. 
If any directive is violated, you must revise the question until it is fully compliant.
`;
};
// logic for getting students' code from AutoGrader
// Dummy code at
const studentCode = () => {
  return `
    function calculateTotal(prices) {
      let total = 0;
      for (let i = 0; i < prices.length; i++) {
        total += prices[i];
      }
      return total;
    }
  `;
};

/**
 * Combines the contextual background with the student's code.
 * @param {string} assignmentId - The ID of the assignment to generate the prompt for.
 * @returns {Promise<string>} The complete prompt string ready to be sent to the AI.
 */
const userPrompt = async (assignmentId) => {
  return `
    Context: 
    ${await fetchAssignmentAndChapterDetails(assignmentId)}
    
    Students' code:
    ${studentCode()}
    `;
};

module.exports = {
  userPrompt,
  systemPrompt,
};

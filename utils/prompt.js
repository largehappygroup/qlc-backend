const Chapter = require("../models/Chapter.js");
const ChapterAssignment = require("../models/ChapterAssignment.js");


/**
 * Fetches and compiles background context for a given assignment, including details about the assignment itself and its parent chapter, from the database.
 * @param {string} assignmentId - The MongoDB ObjectId of the assignment.
 * @returns {Promise<string>} A formatted string containing the combined chapter and assignment details.
 * @throws {Error} Throws an error if the assignment or chapter cannot be found.
 */
const fetchAssignmentAndChapterDetails = async (assignmentId) => {

  // Assignment details
  try {
    const chapterAssignmentDetails = await ChapterAssignment.findById(
      assignmentId
    ).select("title instructions chapterId");

    if (!chapterAssignmentDetails) {
      throw new Error("Assignment not found.");
    }

    const { title: assignmentTitle, instructions: assignmentInstruction, chapterId } =
      chapterAssignmentDetails;


    // Chapter details
    const chapterDetails = await Chapter.findById(chapterId).select(
      "learningObjectives title description"
    );

    if (!chapterDetails) {
      throw new Error("Chapter not found.");
    }

    const { learningObjectives: chapterLearningObjectives, title: chapterTitle, description: chapterDescription } =
      chapterDetails;


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
 * Generates the system prompt, which defines the AI model's persona, its task, and strict output requirements.
 * @returns {string} A detailed instruction string, formatted and ready to be sent to the AI.
 */
const systemPrompt = () => {
  const incorrectAnswers = 3;
  const minNumberOfHints = 1;
  const maxNumberOfHints = 2;
  const difficultyLevels = new Set(["Easy", "Intermediate", "Advanced"]);
  const numberOfQuestions = 2;
  const questionType = ["multiple-choice", "coding"][0]; // only dealing with MCQs at the moment

  return `You are an Expert Computer Science Educator specializing in code analysis and personalized learning. You will be provided with context about a programming chapter, the details of a specific assignment, and a student's submitted code for that assignment.
  Your primary task is to analyze the student's code submission and generate a set of insightful ${questionType} questions based directly on their work. The goal is to test their understanding of their own logic, code structure, and potential improvements.
  For each question you generate, you must provide the following in a structured format:
  1. ${numberOfQuestions} ${questionType} Questions: The questions must be directly related to the provided student's code. They could ask about the purpose of a specific block, the output of a function, a potential bug, or a way to refactor it.
  2. Answer Options: Provide one clearly correct answer and ${incorrectAnswers} plausible but incorrect answers derived from common mistakes or misunderstandings related to the code.
  3. Explanation: For the correct answer, provide a concise explanation of why it is correct, referencing the student's code.
  4. Hints: For the incorrect answers, provide a set of ${minNumberOfHints}-${maxNumberOfHints} hints. These hints should not give the answer away but should gently guide the student's thinking toward the correct concept or line of code.
  5. Difficulty Level: Assign a difficulty level to each question from the following options: ${[
    ...difficultyLevels,
  ].join(", ")}.
 
  Your response must be a valid JSON array containing ${numberOfQuestions} question objects. Return only the raw JSON and nothing else. Do not wrap the response in markdown code fences. Do not include any text before or after the JSON array.
  Each object in the array must follow this exact structure:
  [ 
    {
        "questionText" : "String", 
        "correctAnswer": "String", 
        "otherAnswers": [List of ${incorrectAnswers} Strings], 
        "explanation": "String", 
        "hints": [List of ${minNumberOfHints}-${maxNumberOfHints} Strings], 
        "difficulty": "String", 
    }
  ]
`;
};

// logic for getting students' code from AutoGrader
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
const questionGenerationPrompt = async (assignmentId) => {
  return `
    Context: 
    ${await fetchAssignmentAndChapterDetails(assignmentId)}
    
    Students' code:
    ${studentCode()}
    `;
};

module.exports = {
  questionGenerationPrompt,
  systemPrompt,
};

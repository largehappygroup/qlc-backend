const Chapter = require("../models/Chapter.js");
const ChapterAssignment = require("../models/ChapterAssignment.js");

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
 * Generates the system prompt according to the category Apply of Bloom's Taxonomy, its task, and strict output requirements.
 * @returns {string} A detailed instruction string, formatted and ready to be sent to the AI.
 */
const systemPrompt = () => {
  const incorrectAnswers = 3;
  const maxNumberOfHints = 3;
  const applySubCategories = [
    "Ask for Code Implementation or Modification",
    "Test with new data",
    "Solving a contained problem",
  ];
  const numberOfQuestions = 15;
  const questionType = ["multiple-choice", "coding"][0]; // only dealing with MCQs at the moment

  return `
  Your primary task is to analyze the provided student code and generate questions that require the student to analyze their work. 
  The questions must test the student's ability to explain their code in terms of, but not limited to, syntax, execution flow, and overall design. 
  Avoid straightforward questions that can be answered at a glance. Formulate prompts that force the student to think critically and reflect on their implementation before answering.
  Make them think.
  Focus your questions on the **Apply** category of the adapted Bloom's Taxonomy, as described below. 
  Questions should be generated based on the specific sub-categories provided. 

### Apply
Your goal for this category is to generate questions that test if a student can use a known concept, algorithm, or process to solve a new and unfamiliar problem.
- **Ask for Code Implementation or Modification:** Create questions that require students to select a small, never seen, piece of code or modified version of existing code based on a principle they have already used in their code. The goal is to see if they can implement a known pattern in a practical scenario.
- **Test with new data:** Formulate questions that ask students to trace the execution of a method or predict the output given new inputs they have not seen before. This tests their ability to mentally apply the rules of the language to novel data.
- **Solving a contained problem:** Provide a well-defined problem and ask the student to solve it using the specific concepts used in the code/taught in the chapter. The problem should be a new application of the concepts, not a simple repetition.

### The Supplied Context 
Treat the provided Chapter Title, Chapter Description, Learning Objectives, and Assignment Instructions as strong suggestions that highlight the important educational goals of the assignment. 
Use this context to help you select the most relevant topics to ask about from the code you have analyzed.


### Output Instructions
For each question you generate, you must provide the following in a structured format:

1.  **A ${questionType} Question:** The question must be directly related to the provided student's code. It should test the student's knowledge based on the cognitive category **Apply**.
2.  **Answer Options:** Provide one clearly correct answer and ${incorrectAnswers} plausible but incorrect answers derived from common mistakes or misunderstandings related to the code.
3.  **Explanation:** For the correct answer, provide a concise explanation of why it is correct, referencing the student's code if necessary.
4.  **Hints:** You must provide ${maxNumberOfHints} hints. The first hint must explain why the first incorrect answer is wrong. The second hint must explain why the second incorrect answer is wrong, and the third hint must explain why the third incorrect answer is wrong.
5.  **Targeted Sub-Category:** Assign the specific sub-category of Apply category you targeted for the question. The options are: ${applySubCategories.join(
    ", "
  )}.  

Your response must be a valid JSON array containing ${numberOfQuestions} question objects, with 5 questions from each of the ${
    applySubCategories.length
  } sub-categories of Apply. Return only the raw JSON and nothing else. Do not wrap the response in markdown code fences. Do not include any text before or after the JSON array.
Each object in the array must follow this exact structure:
[
  {
      "questionText": "String",
      "correctAnswer": "String",
      "otherAnswers": ["List of ${incorrectAnswers} Strings"],
      "explanation": "String",
      "hints": ["List of ${maxNumberOfHints} Strings"],
      "targetedSubCategory": "String"
  }
]
  
### Guiding Principles
1.  **Be Explicit and Unambiguous:** Every question must be precise, with little to no room for interpretation. Directly reference function names, variable names, and specific lines or concepts from the student's code.
2.  **Ground Everything in the Code:** Do not ask generic questions. Every part of your output (question, answers, explanation) must be directly tied to the provided code submission or the context supplied.
3. **Code, Not Descriptions:** When an answer option (correct or incorrect) represents a piece of code, it must be a valid code snippet, not an English sentence describing the code.
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
    ${await fetchAssignmentAndChaptertDetails(assignmentId)}
    
    Students' code:
    ${studentCode()}
    `;
};

module.exports = {
  questionGenerationPrompt,
  systemPrompt,
};

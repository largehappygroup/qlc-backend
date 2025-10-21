const fs = require("fs");
const path = require("path");

const Chapter = require("../models/Chapter.js");
const Assignment = require("../models/Assignment.js");

const categories = JSON.parse(
    fs.readFileSync(path.join(__dirname, "categories.json"), "utf8")
);
/**
 * Fetches and compiles background context for a given assignment, including details about the assignment itself and its parent chapter, from the database.
 * @param {string} assignmentId - The uuid of the assignment.
 * @returns {Promise<string>} A formatted string containing the combined chapter and assignment details.
 * @throws {Error} Throws an error if the assignment or chapter cannot be found.
 */
const fetchAssignmentAndChaptertDetails = async (assignmentId) => {
    // Assignment details
    try {
        const assignmentDetails = await Assignment.findOne({
            uuid: assignmentId,
        }, { _id: 0 }).select("title instructions chapterId");

        if (!assignmentDetails) {
            throw new Error("Assignment not found.");
        }

        const {
            title: assignmentTitle,
            instructions: assignmentInstruction,
            chapterId,
        } = chapterAssignmentDetails;

        // Chapter details
        const chapterDetails = await Chapter.findOne({ uuid: chapterId }, { _id: 0 }).select(
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
 * Generates the system prompt according to the category Create of Bloom's Taxonomy, its task, and strict output requirements.
 * @returns {string} A detailed instruction string, formatted and ready to be sent to the AI.
 */
const systemPrompt = () => {
    const incorrectAnswers = 3;
    const maxNumberOfHints = 3;
    const category = "Apply";
    const numberOfQuestions = 6;
    const questionType = ["multiple-choice", "coding"][0]; // only dealing with MCQs at the moment

    const categoryInfo = categories[category];
    const subCategories = Object.keys(categoryInfo.subCategories);

    // Formatting in a bullet point list with a bold title
    const subCategoriesString = Object.entries(categoryInfo.subCategories)
        .map(([title, description]) => `- **${title}:** ${description}`)
        .join("\n");

    return `
  Your primary task is to analyze the provided student code and generate questions that require the student to analyze their work. 
  The questions must test the student's ability to explain their code in terms of, but not limited to, syntax, execution flow, and overall design. 
  Avoid straightforward questions that can be answered at a glance. Formulate prompts that force the student to think critically and reflect on their implementation before answering.
  Make them think.
  Focus your questions on the **${category}** category of the adapted Bloom's Taxonomy, as described below. 
  Questions should be generated based on the specific sub-categories provided. 

### ${category}
  ${categoryInfo.goal}
  ${subCategoriesString}

### Output Instructions
For each question you generate, you must provide the following in a structured format:

1.  **A ${questionType} Question:** The question must be directly related to the provided student's code. It should test the student's knowledge based on the cognitive category **${category}**.
2.  **Answer Options:** Provide one clearly correct answer and ${incorrectAnswers} plausible but incorrect answers derived from common mistakes or misunderstandings related to the code.
3.  **Explanation:** For the correct answer, provide a concise explanation of why it is correct, referencing the student's code if necessary.
4.  **Hints:** You must provide ${maxNumberOfHints} hints. The first hint must explain why the first incorrect answer is wrong. The second hint must explain why the second incorrect answer is wrong, and the third hint must explain why the third incorrect answer is wrong.
5.  **Targeted Sub-Category:** Assign the specific sub-category of ${category} category you targeted for the question. The options are: ${subCategories.join(
        ", "
    )}.  

Your response must be a valid JSON array containing ${numberOfQuestions} question objects, with ${
        numberOfQuestions / subCategories.length
    } questions from each of the ${
        subCategories.length
    } sub-categories of ${category}. Return only the raw JSON and nothing else. Do not wrap the response in markdown code fences. Do not include any text before or after the JSON array.
Each object in the array must follow this exact structure:
[
  {
      "query": "String",
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
3. **Code, Not Descriptions:** Crucially, when any answer option (correct or incorrect) represents a piece of code, it must be a valid, syntax-correct code snippet. Do not provide an English sentence that describes the code.
4. **Show, Don't Tell (Example):** 
    **BAD (Avoid):** "correctAnswer": "Create a new Vehicle object with make 'Ford' and model 'Mustang'."
    **GOOD (Do this):** "correctAnswer": "Vehicle myCar = new Vehicle(\"Ford\", \"Mustang\");"
5. **Maintain Parallel Structure:** All answer options (both correct and incorrect) must be parallel in structure and similar in length and specificity. The incorrect answers should be plausible and not easily distinguishable from the correct answer based on formatting or detail alone. Avoid making the correct answer significantly longer or more detailed than the distractors.
`;
};

// logic for getting students' code from AutoGrader
// Dummy code at the momment
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

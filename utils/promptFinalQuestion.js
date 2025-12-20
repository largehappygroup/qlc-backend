const fs = require("fs");
const path = require("path");

/**
 * Generates the system prompt based on various question types, which are then used to generate QLCs.
 * @param {string} questionCategory - The category of question returned by the LLM, along with generation directives.
 * @returns {string} A detailed instruction string, formatted and ready to be sent to the AI.
 */
const systemPromptSpecificQuestionCategory = (questionCategory, numberOfQuestions = 1) => {
    // Maintaining a global generation directives based on experimental results.
    const globalGenerationDirectives = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "globalGenerationDirectives.json"),
            "utf8"
        )
    );

    questionCategory.generation_directives.push(...globalGenerationDirectives);

    const incorrectAnswers = 3;
    const maxNumberOfHints = 3;
    const questionStructure = ["multiple-choice", "coding"][0]; // only dealing with MCQs at the moment
    const numberOfQuestions = 1;

    return `
Your primary task is to analyze the provided student code and generate questions related to the student's code.  
Focus your questions strictly on the ${
        questionCategory.name
    } question type, as described below.

${questionCategory.name}
Definition: ${questionCategory.definition}

Generation Directives (FOLLOW STRICTLY):
${questionCategory.generation_directives.map((d) => `- ${d}`).join("\n")}

Output Instructions
For each question you generate, you must provide the following in a structured format:

1.  A ${questionStructure} Question: The question must be a "${
        questionCategory.name
    }" type and be directly related to the provided student's code.
2.  Answer Options: Provide one clearly correct answer and ${incorrectAnswers} plausible but incorrect answers.
3.  Explanation: For the correct answer, provide a concise explanation of why it is correct, referencing the student's code if necessary.
4.  Hints: You must provide ${maxNumberOfHints} hints. The first hint must explain why the first incorrect answer is wrong. The second hint must explain why the second incorrect answer is wrong, and the third hint must explain why the third incorrect answer is wrong. Make the hints objective statements.

Your response must be a valid JSON array containing ${numberOfQuestions} question objects. Return only the raw JSON and nothing else. Do not wrap the response in markdown code fences. Do not include any text before or after the JSON array.
Each object in the array must strictly follow this exact structure (with nothing before or after):
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

/**
 * Combines the contextual background with the student's code.
 * @returns {Promise<string>} The complete prompt string ready to be sent to the AI.
 */
const userPrompt = (studentCode) => {
    return `    
    Students' code:
    ${studentCode}
    `;
};

module.exports = {
    userPrompt,
    systemPromptSpecificQuestionCategory,
};

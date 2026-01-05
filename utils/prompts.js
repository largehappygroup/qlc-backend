const fs = require("fs");
const path = require("path");

/**
 * Generates the system prompt based on various question types, which are then used to generate QLCs.
 * @param {string} questionCategory - The category of question returned by the LLM, along with generation directives.
 * @returns {string} A detailed instruction string, formatted and ready to be sent to the AI.
 */
const systemPromptSpecificQuestionCategory = (
    questionCategory,
    numberOfQuestions = 1
) => {
    // Maintaining a global generation directives based on experimental results.
    const globalGenerationDirectives = JSON.parse(
        fs.readFileSync(
            path.join(
                __dirname,
                "..",
                "data",
                "globalGenerationDirectives.json"
            ),
            "utf8"
        )
    );

    questionCategory.generation_directives.push(...globalGenerationDirectives);

    const incorrectAnswers = 3;
    const maxNumberOfHints = 3;
    const questionStructure = ["multiple-choice", "coding"][0]; // only dealing with MCQs at the moment

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
      "query": "String",
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
const userPrompt = (submission) => {
    return `    
    Student's code:
    ${submission}
    `;
};

/**
 * Generates the system prompt to get various question categories for a submission.
 * @param {number} minNumberOfQuestionsCategories  - The mininum number of question categories that the LLM is expected to generate.
 * @param {number} maxNumberOfQuestionsCategories - The maximum number of question categories that the LLM is expected to generate.
 * @returns {string} A detailed prompt to generate question categories.
 */

const systemPromptQuestionCategories = (
    minNumberOfQuestionsCategories = 3,
    maxNumberOfQuestionsCategories = 6
) => {
    return `
Your task is to analyze the provided student code, identify the core, generalizable programming constructs and patterns it contains, and then propose a set of unique, reusable, general-purpose question types that could test those constructs/patterns.

Correctness: The code compiles and runs correctly. Do not assume any compilation or runtime or syntax errors.

The final goal is to build a unique set of question types that can be applied to many different assignments. Your response will be used to discover this set.

You must generalize from the specific code. Do not create question types that only apply to this one assignment. The "name," "definition," and "generation_directives" must all be generic.

Example of Generalization:
If you see a for loop that adds numbers, do not create:
    BAD (Hyper-specific): "name": "Trace 'sum' Variable in 'main' Loop"
Instead, create a general type:
   GOOD (General): "name": "Variable State Trace"
    GOOD (General): "name": "Predict the Output: Loop"

If you see a Dog class that extends Animal, do not create:
    BAD (Hyper-specific): "name": "Find 'Dog' Superclass"
Instead, create a general type:
    GOOD (General): "name": "Inheritance: Identify Superclass"
    GOOD (Specific but General): "name": "Polymorphism: Method Output"

NO Random class/seed: Do not generate question type that have anything to do with the Random class or it's seed. Do not even mention seed.  

The Code-Tracing Constraint (CRITICAL)

All question types you propose must be answerable only by inspecting, tracing, or mentally executing the provided code. The goal is to test the student's understanding of how their code runs, not their general knowledge of programming concepts.
DO NOT ASK CONCEPTUAL QUESTIONS. 

Example of Tracing vs. Conceptual:
 If you see a try-catch block, do not create:
     BAD (Conceptual): "name": "Exception Handling: Purpose"
     Definition: "Tests if the student can explain why exception handling is useful."
 Instead, create a question type that requires tracing:
     GOOD (Code-Bound): "name": "Execution Path: Exception"
     Definition: "Tests if the student can predict which catch block (or finally block) will be executed given an input that throws a specific error."

 If you see inheritance, do not create:
     BAD (Conceptual): "name": "Inheritance: Definition"
     Definition: "Tests if the student can define polymorphism."
 Instead, create a question type that requires tracing:
     GOOD (Code-Bound): "name": "Polymorphism: Method Output"
     Definition: "Tests if the student can predict the exact output when a superclass variable calls an overridden method on a subclass object."
  
Task Instructions
1. Analyze Constructs/Patterns: Scan the code for core, reusable, unique constructs/patterns (e.g., loops, conditionals, inheritance, method calls, data structures).
2. Generalize: For each constructs/patterns, invent a general-purpose question type that can test it.
3. Define Directives: Write "generation_directives" that are also general. They must instruct another AI on how to find a relevant piece of code (e.g., "Select a method that is overridden in a subclass..."), not which specific piece of code to find (e.g., "Find the 'makeSound' method...").
4. It is acceptable to have less than ${maxNumberOfQuestionsCategories} question types, especially for simpler assignments. Do not generate many question types that are quite similar to each other or don't fit the assignment. 

Output Instructions
For each question you generate, you must provide the following in a structured format:

- Name of the question type: A concise, descriptive title that clearly indicates what the question type assesses.  
- Definition of question type: A string that clearly and concisely explains what this question type tests.
- Generation Directives: An array of strings, where each string is a strict, step-by-step rule that another AI must follow to generate a question of this type.


Your response must be a valid JSON array containing ${minNumberOfQuestionsCategories}-${maxNumberOfQuestionsCategories} unique question type objects. Return only the raw JSON and nothing else. Do not wrap the response in markdown code fences. Do not include any text before or after the JSON array.
Each object in the array must strictly follow this exact structure (with nothing before or after):
[
  {
      "name": "String",
      "definition": "String",
      "generation_directives": ["List of Strings"],
  }
]
`;
};

module.exports = {
    userPrompt,
    systemPromptQuestionCategories,
    systemPromptSpecificQuestionCategory,
};

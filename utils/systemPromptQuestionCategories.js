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
    systemPromptQuestionCategories,
};

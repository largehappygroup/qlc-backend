const axios = require("axios");

const AMPLIFY_API_KEY = process.env.AMPLIFY_API_KEY;
const API_ENDPOINT = `${process.env.BASE_URL}/chat`; // for generative capabilities

/**
 * Constructs the specific payload object required for the Amplify API.
 * @param {string} systemPrompt - The system prompt for the AI.
 * @param {string} userPrompt - The user prompt for the AI.
 * @returns {object} The complete payload object.
 */
function buildApiPayload(systemPrompt, userPrompt) {
  return {
    data: {
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 100000, // make sure enough tokens are given to receive the entire response
      dataSources: [], // required field, for rag -- will skip later
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      options: {
        ragOnly: false,
        skipRag: true,
        model: { id: "gpt-4o" },
        prompt: userPrompt,
      },
    },
  };
}

/**
 * Parses the JSON string from the AI's response data.
 * @param {string} responseData - The string data from the API response, expected to be JSON.
 * @returns {object | undefined} The parsed JavaScript object, or undefined if parsing fails.
 */
function parseAIResponse(responseData) {
  try {
    return JSON.parse(responseData);
  } catch (error) {
    console.error(
      "JSON formatting not correct. Either some weird formatting in the AI response, or it may have been cut off by max_tokens."
    );
    console.error("Received data:", responseData);
    return undefined; // Explicitly return undefined on failure
  }
}

/**
 * Calls Amplify API to generate questions based on system and user prompts.
 * @param {string} systemPrompt - The instruction string that defines the AI's role and desired output format.
 * @param {string} userPrompt - The user-specific content, including code and context, for the AI to analyze.
 * @returns {Promise<object | undefined>} A promise that resolves to a parsed JSON object containing the generated questions. Returns undefined if an API or parsing error occurs.
 * @throws {Error} Throws an error if the AMPLIFY_API_KEY is not set in the environment variables.
 */
const generateQuestions = async (systemPrompt, userPrompt) => {
  if (!AMPLIFY_API_KEY) {
    console.error("AMPLIFY_API_KEY is not set in environment variables.");
    throw new Error("AMPLIFY API key is missing.");
  }

  // Validate inputs
  if (typeof systemPrompt !== "string" || typeof userPrompt !== "string") {
    console.error("Invalid input: systemPrompt and userPrompt must be strings.");
    console.error("Received systemPrompt:", systemPrompt);
    console.error("Received userPrompt:", userPrompt);
    throw new Error("Invalid input: systemPrompt and userPrompt must be strings.");
  }

  // TODO: remove after debugging
  console.log("Type of systemPrompt:", typeof systemPrompt, "Value:", systemPrompt);
  console.log("Type of userPrompt:", typeof userPrompt, "Value:", userPrompt);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AMPLIFY_API_KEY}`,
  };

  const payload = buildApiPayload(systemPrompt, userPrompt);

  // Log payload for debugging
  console.log("Payload being sent to API:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(API_ENDPOINT, payload, { headers });

    // With axios, the response data is directly on the .data property
    const responseData = response.data;

    // only passing the questions from the response data as JSON objects after parsing
    // Note: API nests the data twice, so we pass response.data.data
    return parseAIResponse(responseData.data);
  } catch (error) {
    console.error("Error making API request:");
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
  }
};

module.exports = {
  generateQuestions,
};

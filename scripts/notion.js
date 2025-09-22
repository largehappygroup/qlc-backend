require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client } = require("@notionhq/client");
const { parse } = require("csv-parse/sync");

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const CSV_FILE_PATH = path.join(__dirname, "bulk_generated_questions.csv"); // Path to your CSV file

const notion = new Client({ auth: NOTION_KEY });
/**
 * A helper function to split a long string into chunks of a maximum length.
 * @param {string} text - The string to split.
 * @param {number} maxLength - The maximum length of each chunk.
 * @returns {string[]} An array of string chunks.
 */
const splitStringIntoChunks = (text, maxLength = 2000) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.substring(i, i + maxLength));
  }
  return chunks;
};

/**
 * Parses a multi-line context string into an array of Notion blocks.
 * @param {string} contextString - The raw string from the CSV.
 * @returns {Array<object>} An array of Notion block objects.
 */
const createContextBlocks = (contextString) => {
  if (!contextString) return [];

  const blocks = [];
  const lines = contextString.trim().split("\n");

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (trimmedLine === "") return;

    // Check for main headings
    if (trimmedLine.endsWith("Details:")) {
      blocks.push({
        heading_3: {
          rich_text: [{ text: { content: trimmedLine } }],
        },
      });
    }
    // Check for bullet points starting with '-'
    else if (trimmedLine.startsWith("- ")) {
      blocks.push({
        bulleted_list_item: {
          // Remove the leading '- ' for clean text
          rich_text: [{ text: { content: trimmedLine.substring(2) } }],
        },
      });
    }
    // Check for numbered list items like "1. "
    else if (trimmedLine.match(/^\d+\.\s/)) {
      blocks.push({
        numbered_list_item: {
          // Remove the leading "1. ", "2. ", etc.
          rich_text: [
            { text: { content: trimmedLine.replace(/^\d+\.\s/, "") } },
          ],
        },
      });
    }
    // Treat anything else as a paragraph (useful for instructions)
    else {
      blocks.push({
        paragraph: {
          rich_text: [{ text: { content: trimmedLine } }],
        },
      });
    }
  });

  return blocks;
};

/**
 * Main function to read the CSV and create formatted Notion pages.
 */
async function importCsvToNotion() {
  // Validate that credentials are provided
  if (!NOTION_KEY || !NOTION_DATABASE_ID) {
    console.error(
      "❌ ERROR: Make sure NOTION_KEY and NOTION_DATABASE_ID are set in your .env file."
    );
    return;
  }

  // 1. Read and parse the CSV file
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`❌ ERROR: Cannot find CSV file at path: ${CSV_FILE_PATH}`);
    return;
  }

  const fileContent = fs.readFileSync(CSV_FILE_PATH);
  const records = parse(fileContent, {
    columns: true, // Use the first row as headers
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records to import. Starting process...`);

  // 2. Loop through each record from the CSV
  for (const record of records) {
    try {
      // Log progress for each record being processed
      console.log(
        `  -> Creating page for question: "${record.questionText.substring(
          0,
          40
        )}..."`
      );

      const otherAnswersArray = (record.otherAnswers || "")
        .split(";")
        .map((answer) => answer.trim())
        .filter((answer) => answer.length > 0);
      const hintsArray = (record.hints || "")
        .split(";")
        .map((answer) => answer.trim())
        .filter((answer) => answer.length > 0);

      const studentCode = record.studentCode || "No code provided.";
      const codeChunks = splitStringIntoChunks(studentCode);

      // Map each string chunk into a Notion rich_text object
      const codeRichTextObjects = codeChunks.map((chunk) => ({
        text: { content: chunk },
      }));

      // 3. Create a new page in the specified Notion database
      await notion.pages.create({
        parent: { database_id: NOTION_DATABASE_ID },

        // Populate the database properties (the columns)
        properties: {
          questionText: {
            // This MUST exactly match the name of your Title property in Notion
            title: [{ text: { content: record.questionText || "Untitled" } }],
          },
          submissionIndex: {
            number: Number(record.submissionIndex) || null,
          },
        },

        // Create the page content using a structured array of blocks
        children: [
          {
            object: "block",
            heading_2: {
              rich_text: [{ text: { content: "Student's Code" } }],
            },
          },
          {
            object: "block",
            code: {
              rich_text: codeRichTextObjects,
              language: "java", // Set your desired language for syntax highlighting
            },
          },
          {
            object: "block",
            divider: {}, // A visual separator line
          },
          // {
          //   object: "block",
          //   heading_2: {
          //     rich_text: [{ text: { content: "Context Supplied" } }],
          //   },
          // },
          // ...createContextBlocks(record.context),
          {
            object: "block",
            divider: {}, // A visual separator line
          },
          {
            heading_3: {
              // Use a heading for the label
              rich_text: [{ text: { content: "Question" } }],
            },
          },
          {
            paragraph: {
              // The answer text is in its own, simple paragraph
              rich_text: [{ text: { content: record.questionText || "N/A" } }],
            },
          },
          {
            heading_3: {
              // Use a heading for the label
              rich_text: [{ text: { content: "Correct Answer" } }],
            },
          },
          {
            paragraph: {
              // The answer text is in its own, simple paragraph
              rich_text: [{ text: { content: record.correctAnswer || "N/A" } }],
            },
          },
          {
            heading_3: {
              rich_text: [{ text: { content: "Other Answers" } }],
            },
          },

          ...otherAnswersArray.map((answer) => ({
            bulleted_list_item: {
              rich_text: [{ text: { content: answer || "N/A" } }],
            },
          })),

          {
            heading_3: {
              rich_text: [{ text: { content: "Explanation" } }],
            },
          },
          {
            paragraph: {
              rich_text: [{ text: { content: record.explanation || "N/A" } }],
            },
          },
          {
            heading_3: {
              rich_text: [{ text: { content: "Hints" } }],
            },
          },
          ...hintsArray.map((answer) => ({
            bulleted_list_item: {
              rich_text: [{ text: { content: answer || "N/A" } }],
            },
          })),
          //   {
          //     object: "block",
          //     // Use a toggle block for a clean Q&A format
          //     toggle: {
          //       rich_text: [
          //         {
          //           text: { content: record.questionText || "" },
          //           annotations: { bold: true },
          //         },
          //       ],
          //       // This is the content that appears when the toggle is opened
          //       children: [

          //       ],
          //     },
          //   },
        ],
      });
    } catch (error) {
      // Log any errors that occur for a specific page creation
      console.error(
        `❌ Failed to create page for record: "${record.questionText}"`
      );
      // The error from the Notion API is often very descriptive
      console.error(
        "API Error:",
        error.body ? JSON.parse(error.body).message : error.message
      );
    }
  }
  console.log("\n✅ Import complete!");
}

// --- RUN THE SCRIPT ---
importCsvToNotion();

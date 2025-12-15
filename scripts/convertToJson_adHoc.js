const { helenSubmimssion } = require("./dummy-data");

const fs = require("fs");

/**
 * Removes Java-style comments from a string.
 */
const removeComments = (code) => {
  // Regex matches /* ... */ OR // ...
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
};

const convertToJson = (submissions) => {
  const formattedData = submissions.map((code, index) => {
    // 1. Remove comments
    let cleanCode = removeComments(code);

    // 2. Remove empty lines (lines that contain only whitespace)
    cleanCode = cleanCode
      .split("\n") // Split text into an array of lines
      .filter((line) => line.trim() !== "") // Remove lines that are empty or just whitespace
      .join("\n"); // Join them back with a single newline char

    return {
      id: index,
      source: "Vanderbilt Introduction to Computer Science, Java",
      // JSON.stringify will automatically ensure line breaks are stored as "\n"
      content: cleanCode.trim(),
    };``
  });

  // Convert to JSON string
  const jsonOutput = JSON.stringify(formattedData, null, 2);

  // Write to file
  fs.writeFileSync("submissions.json", jsonOutput, "utf8");
  console.log(
    `Successfully saved ${formattedData.length} submissions to submissions.json`
  );
};

// Run the script
convertToJson(helenSubmimssion);

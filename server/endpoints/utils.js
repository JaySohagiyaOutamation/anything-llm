const fs = require("fs");
const path = require("path");
const { SystemSettings } = require("../models/systemSettings");

function utilEndpoints(app) {
  if (!app) return;

  app.get("/utils/metrics", async (_, response) => {
    try {
      const metrics = {
        online: true,
        version: getGitVersion(),
        mode: (await SystemSettings.isMultiUserMode())
          ? "multi-user"
          : "single-user",
        vectorDB: process.env.VECTOR_DB || "lancedb",
        storage: await getDiskStorage(),
      };
      response.status(200).json(metrics);
    } catch (e) {
      console.error(e);
      response.sendStatus(500).end();
    }
  });
}

function getGitVersion() {
  if (process.env.ANYTHING_LLM_RUNTIME === "docker") return "--";
  try {
    return require("child_process")
      .execSync("git rev-parse HEAD")
      .toString()
      .trim();
  } catch (e) {
    console.error("getGitVersion", e.message);
    return "--";
  }
}

function byteToGigaByte(n) {
  return n / Math.pow(10, 9);
}

async function getDiskStorage() {
  try {
    const checkDiskSpace = require("check-disk-space").default;
    const { free, size } = await checkDiskSpace("/");
    return {
      current: Math.floor(byteToGigaByte(free)),
      capacity: Math.floor(byteToGigaByte(size)),
    };
  } catch {
    return {
      current: null,
      capacity: null,
    };
  }
}

const documentsPath = path.join(__dirname, "../storage/documents/custom-documents");

async function changeFileByDocId(fileName, workspaceId, role) {
  // Ensure the documents path exists
  if (!fs.existsSync(documentsPath)) {
    console.error(`Documents path ${documentsPath} does not exist.`);
    return {
      message: `Documents path does not exist.`,
    };
  }

  // Search for the specific file in the custom-documents folder
  for (const file of fs.readdirSync(documentsPath)) {
    if (path.extname(file) !== ".json") continue; // Skip non-JSON files

    // Check if this is the file we are looking for (by file name)
    if (file === fileName) {
      const filePath = path.join(documentsPath, file);
      let rawData;

      try {
        // Read the raw data from the file
        rawData = fs.readFileSync(filePath, "utf8");
      } catch (err) {
        console.error(`Error reading JSON file ${filePath}:`, err);
        return { message: `Error reading file ${fileName}` };
      }

      // Parse JSON data
      let jsonData;
      try {
        jsonData = JSON.parse(rawData);
      } catch (err) {
        console.error(`Error parsing JSON file ${filePath}:`, err);
        return { message: `Error parsing JSON file ${fileName}` };
      }

      // Add or update workspaceId and role in the JSON object
      jsonData.workspaceId = workspaceId;
      jsonData.role = role;

      try {
        // Write the updated JSON object back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      } catch (err) {
        console.error(`Error writing JSON file ${filePath}:`, err);
        return { message: `Error writing to file ${fileName}` };
      }

      // Successfully updated the file
      return {
        message: `File ${file} updated successfully`,
        updatedData: jsonData,
      };
    }
  }

  // If file is not found, return an error message
  return {
    message: `File with name ${fileName} not found in custom-documents.`,
  };
}
module.exports = {
  utilEndpoints,
  getGitVersion,
  changeFileByDocId
};

const prisma = require("../utils/prisma");

const SupervisorDocumentsService = {
    // Fetch workspaceId from workspace name
    getWorkspaceIdByName: async function (workspaceName) {
        try {
          const workspace = await prisma.workspaces.findFirst({
            where: { name: workspaceName },
          });
      
          if (!workspace) {
            throw new Error(`Workspace with name ${workspaceName} not found.`);
          }
      
          return { workspaceId: workspace.id, error: null };
        } catch (error) {
          console.error("Failed to find workspace by name:", error.message);
          return { workspaceId: null, error: error.message };
        }
      },
      
  
    // Create a new supervisor document entry
create: async function ({ workspaceId, userId }) {
    try {
      // Ensure userId is an integer
      const userIdInt = parseInt(userId, 10);
      
      // Create new entry in supervisor_documents table
      const supervisorDocument = await prisma.supervisorDocuments.create({
        data: {
          workspaceId: workspaceId,
          userId: userIdInt, // Pass the integer userId
        },
      });
  
      // Return the created supervisor document
      return { supervisorDocument, error: null };
    } catch (error) {
      console.error("Failed to create supervisor document:", error.message);
      return { supervisorDocument: null, error: error.message };
    }
  },
  
  };
  
  module.exports = SupervisorDocumentsService;
  
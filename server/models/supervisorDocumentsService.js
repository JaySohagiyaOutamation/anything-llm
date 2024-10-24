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
  
    // get workspaceId by userId for quering 
    getWorkspaceIdByUserId: async function (userId) {
      try {
        const supervisorDoc = await prisma.supervisorDocuments.findFirst({
          where: { userId: userId },
        });
    
        if (!supervisorDoc) {
          throw new Error(`supervisorDoc with userId ${userId} not found.`);
        }
    
        return { workspaceId: supervisorDoc.workspaceId, error: null };
      } catch (error) {
        console.error("Failed to find supervisorDoc by userId:", error.message);
        return { workspaceId: null, error: error.message };
      }
    },
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
  delete: async function ({ workspaceId, userId }) {
    try {
      // Ensure userId is an integer
      const userIdInt = parseInt(userId, 10);
      
      // Delete the entry in supervisor_documents table where workspaceId and userId match
      const deletedSupervisorDocument = await prisma.supervisorDocuments.deleteMany({
        where: {
          workspaceId: workspaceId,
          userId: userIdInt, // Match the integer userId
        },
      });
  
      // Check if any record was deleted
      if (deletedSupervisorDocument.count > 0) {
        return { deleted: true, error: null };
      } else {
        return { deleted: false, error: 'No matching document found' };
      }
    } catch (error) {
      console.error("Failed to delete supervisor document:", error.message);
      return { deleted: false, error: error.message };
    }
  },
  
  
  };
  
  module.exports = SupervisorDocumentsService;
  
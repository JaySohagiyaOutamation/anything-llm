const prisma = require("../utils/prisma");

const WorkspaceUser = {
  createMany: async function (userId, workspaceIds = []) {
    if (workspaceIds.length === 0) return;
    try {
      await prisma.$transaction(
        workspaceIds.map((workspaceId) =>
          prisma.workspace_users.create({
            data: { user_id: userId, workspace_id: workspaceId },
          })
        )
      );
    } catch (error) {
      console.error(error.message);
    }
    return;
  },

  createManyUsers: async function (userIds = [], workspaceId) {
    if (userIds.length === 0) return;
    try {
      await prisma.$transaction(
        userIds.map((userId) =>
          prisma.workspace_users.create({
            data: {
              user_id: Number(userId),
              workspace_id: Number(workspaceId),
            },
          })
        )
      );
    } catch (error) {
      console.error(error.message);
    }
    return;
  },

  create: async function (userId = 0, workspaceId = 0) {
    try {
      await prisma.workspace_users.create({
        data: { user_id: Number(userId), workspace_id: Number(workspaceId) },
      });
      return true;
    } catch (error) {
      console.error(
        "FAILED TO CREATE WORKSPACE_USER RELATIONSHIP.",
        error.message
      );
      return false;
    }
  },

  get: async function (clause = {}) {
    try {
      const result = await prisma.workspace_users.findFirst({ where: clause });
      return result || null;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  getWorkspaceIds: async function (userId) {
    try {
      // Fetch all workspace_users entries associated with the given userId
      const workspaceAssociations = await prisma.workspace_users.findMany({
        where: {
          user_id: userId,
        },
        select: {
          workspace_id: true, // Only select workspace_id from the results
        },
      });
  
      // Extract workspace IDs into an array
      const workspaceIds = workspaceAssociations.map(
        (association) => association.workspace_id
      );
  
      return workspaceIds; // Return the array of workspace IDs
    } catch (error) {
      console.error("Error fetching workspace IDs:", error.message);
      throw error;
    }
  },
  

  where: async function (clause = {}, limit = null) {
    try {
      const results = await prisma.workspace_users.findMany({
        where: clause,
        ...(limit !== null ? { take: limit } : {}),
      });
      return results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  count: async function (clause = {}) {
    try {
      const count = await prisma.workspace_users.count({ where: clause });
      return count;
    } catch (error) {
      console.error(error.message);
      return 0;
    }
  },

  delete: async function (clause = {}) {
    try {
      await prisma.workspace_users.deleteMany({ where: clause });
    } catch (error) {
      console.error(error.message);
    }
    return;
  },
  deleteMany: async function (userId, workspaceIds = []) {
    if (workspaceIds.length === 0) return; // No workspaceIds to delete
  
    try {
      // Use a transaction to delete multiple entries based on userId and workspaceIds
      await prisma.$transaction(
        workspaceIds.map((workspaceId) =>
          prisma.workspace_users.deleteMany({
            where: {
              user_id: userId,
              workspace_id: workspaceId,
            },
          })
        )
      );
    } catch (error) {
      console.error("Failed to delete workspace users:", error.message);
    }
    return;
  },
  
};

module.exports.WorkspaceUser = WorkspaceUser;

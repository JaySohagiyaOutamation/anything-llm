const { reqBody } = require("../../../utils/http");
const { WorkspaceUser } = require("../../../models/workspaceUsers");
const { EventLogs } = require("../../../models/eventLogs");
const { userFromSession } = require("../../../utils/http");
const { strictMultiUserRoleValid } = require("../../../utils/middleware/multiUserProtected");
const { ROLES } = require("../../../utils/middleware/multiUserProtected");

function apiWorkspaceUserEndpoints(app) {
  if (!app) return;

  // Create a new WorkspaceUser based on workspaceId and userId
  app.post(
    "/workspace-user/new",
    [strictMultiUserRoleValid([ROLES.admin, ROLES.manager])],
    async (request, response) => {
      try {
        const currUser = await userFromSession(request, response);
        const { workspaceId, userId } = reqBody(request);

        // Validate request body fields
        if (!workspaceId || !userId) {
          response.status(400).json({ error: "Missing required fields: workspaceId, userId" });
          return;
        }

        // Create a new workspace-user relationship
        const workspaceUserCreated = await WorkspaceUser.create(userId, workspaceId);
        if (!workspaceUserCreated) {
          response.status(500).json({ error: "Failed to create workspace-user relationship" });
          return;
        }

        // Log the event
        await EventLogs.logEvent(
          "workspace_user_created",
          {
            userId,
            workspaceId,
          },
          currUser.id
        );

        // Success response
        return response.status(200).json({ success: true, message: "Workspace-User relationship created successfully" });

      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to create workspace-user relationship" });
      }
    }
  );
  app.post(
    "/workspace-user/supervisor/workspaces",
    [strictMultiUserRoleValid([ROLES.admin, ROLES.manager])],
    async (request, response) => {
      try {
        const { userId } = reqBody(request);
        const workspaceIds = await WorkspaceUser.getWorkspaceIds(userId);
        response.status(200).json({ workspaceIds });
      } catch (e) {
        console.error(e);
        response.sendStatus(500).end();
      }
    }
  );

}

module.exports = { apiWorkspaceUserEndpoints };

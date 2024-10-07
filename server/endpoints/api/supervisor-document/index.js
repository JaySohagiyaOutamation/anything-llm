const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { reqBody } = require("../../../utils/http");
const  SupervisorDocumentsService  = require("../../../models/supervisorDocumentsService");
const { EventLogs } = require("../../../models/eventLogs");
const { userFromSession } = require("../../../utils/http");
const { strictMultiUserRoleValid } = require("../../../utils/middleware/multiUserProtected");
const { ROLES } = require("../../../utils/middleware/multiUserProtected");

function apiSupervisorDocumentEndpoints(app) {
  if (!app) return;

  app.post(
    "/supervisor/documents/new",
    [ strictMultiUserRoleValid([ROLES.admin, ROLES.manager, ROLES.supervisor])],
    async (request, response) => {
      try {
        const currUser = await userFromSession(request, response);
        console.log('currUser: ', currUser);
        const documentParams = reqBody(request);

        if (!documentParams.workspaceName || !documentParams.userId) {
          response.status(400).json({ error: "Missing required fields: workspaceName, userId" });
          return;
        }

        const { workspaceId, error: workspaceError } = await SupervisorDocumentsService.getWorkspaceIdByName(documentParams.workspaceName);
        console.log('workspaceId: ', workspaceId);

        if (workspaceError) {
          response.status(400).json({ error: workspaceError });
          return;
        }

        const { supervisorDocument, error } = await SupervisorDocumentsService.create({
            workspaceId,
            userId: documentParams.userId,
        });
        console.log('supervisorDocument: ', supervisorDocument);
        
        if (error) {
          response.status(500).json({ error });
          return;
        }

        await EventLogs.logEvent(
          "supervisor_document_created",
          {
            userId: documentParams.userId,
            workspaceId,
          },
          currUser.id
        );

        return response.status(200).json({ supervisorDocument });
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to create supervisor document" });
      }
    }
  );
}

module.exports = { apiSupervisorDocumentEndpoints };

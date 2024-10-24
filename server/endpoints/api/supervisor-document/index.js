const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { reqBody } = require("../../../utils/http");
const  SupervisorDocumentsService  = require("../../../models/supervisorDocumentsService");
const { EventLogs } = require("../../../models/eventLogs");
const { userFromSession } = require("../../../utils/http");
const { strictMultiUserRoleValid } = require("../../../utils/middleware/multiUserProtected");
const { ROLES } = require("../../../utils/middleware/multiUserProtected");
const { Workspace } = require("../../../models/workspace");
const { workspace_users } = require("../../../utils/prisma");
const { WorkspaceUser } = require("../../../models/workspaceUsers");

function apiSupervisorDocumentEndpoints(app) {
  if (!app) return;

  app.post(
    "/supervisor/new1",
    [ strictMultiUserRoleValid([ROLES.admin, ROLES.manager, ROLES.supervisor])],
    async (request, response) => {
      try {
        const currUser = await userFromSession(request, response);
        const documentParams = reqBody(request);

        if (!documentParams.workspaceName || !documentParams.userId) {
          response.status(400).json({ error: "Missing required fields: workspaceName, userId" });
          return;
        }

        const { workspaceId, error: workspaceError } = await SupervisorDocumentsService.getWorkspaceIdByName(documentParams.workspaceName);

        if (workspaceError) {
          response.status(400).json({ error: workspaceError });
          return;
        }

        const { supervisorDocument, error } = await SupervisorDocumentsService.create({
            workspaceId,
            userId: documentParams.userId,
        });
        
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

        if(supervisorDocument) {
          return response.status(200).json({sucess:true,message:"Supervisor created",workspaceId:workspaceId});
        }
       
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to create supervisor document" });
      }
    }
  );
  app.post(
    "/supervisor/new",
    [strictMultiUserRoleValid([ROLES.admin, ROLES.manager])],
    async (request, response) => {
      try {
        const currUser = await userFromSession(request, response);
        const documentParams = reqBody(request);
  
        // Ensure selectedWorkspaces and userId are provided
        if (!documentParams.selectedWorkspaces || !Array.isArray(documentParams.selectedWorkspaces) || !documentParams.userId) {
          response.status(400).json({ error: "Missing required fields: selectedWorkspaces (array), userId" });
          return;
        }
  
        const failedWorkspaces = [];
        const createdWorkspaces = [];
        const workspaceIds = [];
  
        // Loop through each workspace name and create a supervisor entry
        for (const workspaceName of documentParams.selectedWorkspaces) {
          const { workspaceId, error: workspaceError } = await SupervisorDocumentsService.getWorkspaceIdByName(workspaceName);
  
          if (workspaceError || !workspaceId) {
            failedWorkspaces.push({ workspaceName, error: workspaceError || "Invalid workspace" });
            continue; // Skip to the next workspace in case of error
          }
  
          const { supervisorDocument, error } = await SupervisorDocumentsService.create({
            workspaceId,
            userId: documentParams.userId,
          });
  
          if (error) {
            failedWorkspaces.push({ workspaceName, error });
            continue;
          }
          workspaceIds.push(workspaceId);
          createdWorkspaces.push({ workspaceId, workspaceName });
  
          // Log event for each successfully created supervisor document
          await EventLogs.logEvent(
            "supervisor_document_created",
            {
              userId: documentParams.userId,
              workspaceId,
            },
            currUser.id
          );
        }
        await WorkspaceUser.createMany(documentParams.userId,workspaceIds);
  
        // Prepare the response after all workspaces are processed
        if (createdWorkspaces.length > 0) {
          return response.status(200).json({
            success: true,
            message: "Supervisor created for workspaces",
            createdWorkspaces,
            failedWorkspaces,
          });
        } else {
          return response.status(400).json({
            success: false,
            message: "Failed to create supervisor documents",
            failedWorkspaces,
          });
        }
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to create supervisor documents" });
      }
    }
  );

  app.delete(
    "/supervisor/remove",
    [strictMultiUserRoleValid([ROLES.admin, ROLES.manager])],
    async (request, response) => {
      try {
        const currUser = await userFromSession(request, response);
        const documentParams = reqBody(request);
  
        // Ensure selectedWorkspaces and userId are provided
        if (!documentParams.selectedWorkspaces || !Array.isArray(documentParams.selectedWorkspaces) || !documentParams.userId) {
          return response.status(400).json({ error: "Missing required fields: selectedWorkspaces (array), userId" });
        }
  
        const failedWorkspaces = [];
        const deletedWorkspaces = [];
        const workspaceIds = [];
        
        // Loop through each workspace name and fetch the corresponding workspaceId
        for (const workspaceName of documentParams.selectedWorkspaces) {
          const { workspaceId, error: workspaceError } = await SupervisorDocumentsService.getWorkspaceIdByName(workspaceName);
          
          if (workspaceError || !workspaceId) {
            failedWorkspaces.push({ workspaceName, error: workspaceError || "Invalid workspace" });
            continue; // Skip to the next workspace in case of error
          }
          
          workspaceIds.push(workspaceId);
          
          // Delete supervisor document associated with this workspaceId and userId
          const { error: deleteSupervisorError } = await SupervisorDocumentsService.delete({
            workspaceId,
            userId: documentParams.userId,
          });
          
          if (deleteSupervisorError) {
            failedWorkspaces.push({ workspaceName, error: deleteSupervisorError });
            continue;
          }
          
          // Add the deleted workspace to the response list
          deletedWorkspaces.push({ workspaceId, workspaceName });
      
          // Log the delete event
          await EventLogs.logEvent(
            "supervisor_document_deleted",
            {
              userId: documentParams.userId,
              workspaceId,
            },
            currUser.id
          );
        }
  
        // Delete records from WorkspaceUser table for the given userId and workspaceIds
        if (workspaceIds.length > 0) {
          await WorkspaceUser.deleteMany(documentParams.userId, workspaceIds);
        }
  
        // Prepare the response after all workspaces are processed
        if (deletedWorkspaces.length > 0) {
          return response.status(200).json({
            success: true,
            message: "Supervisor records deleted for selected workspaces",
            deletedWorkspaces,
            failedWorkspaces,
          });
        } else {
          return response.status(400).json({
            success: false,
            message: "Failed to delete supervisor records",
            failedWorkspaces,
          });
        }
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to delete supervisor records" });
      }
    }
  );
  
  
}

module.exports = { apiSupervisorDocumentEndpoints };

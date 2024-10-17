import { API_BASE } from "@/utils/constants";
import { baseHeaders } from "@/utils/request";

const WorkspaceUser = {
  create: async (userId, workspaceId) => {
    return await fetch(`${API_BASE}/workspace-user/new`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({userId,workspaceId}),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return { success: false, error: e.message };
      });
  },
 
};

export default WorkspaceUser;

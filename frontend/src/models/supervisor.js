import { API_BASE } from "@/utils/constants";
import { baseHeaders } from "@/utils/request";

const Supervisor = {
  createSupervisor: async ( workspaceName,userId) => {
    return await fetch(`${API_BASE}/supervisor/new`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ workspaceName,userId }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return { success: false, error: e.message };
      });
  },
 
};

export default Supervisor;

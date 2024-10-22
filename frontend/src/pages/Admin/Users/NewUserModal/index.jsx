import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import Admin from "@/models/admin";
import { userFromStorage } from "@/utils/request";
import { RoleHintDisplay } from "..";
// import WorkspaceUser from "@/models/workspaceUser"
import Workspace from "@/models/workspace";
import Supervisor from "@/models/supervisor";

export default function NewUserModal({ closeModal }) {
  const [error, setError] = useState(null);
  const [supervisorError, setSupervisorError] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  // const [workspaceName, setWorkspaceName] = useState("");
  const [role, setRole] = useState("default");
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);

  const handleCreate = async (e) => {
    setError(null);
    setSupervisorError(null); // Reset supervisor error if any
    e.preventDefault();
  
    const data = {};
    const form = new FormData(e.target);
    for (var [key, value] of form.entries()) data[key] = value;
  
    // Check if the user role is "supervisor" and no workspaces are selected
    if (data.role === "supervisor" && selectedWorkspaces.length === 0) {
      setSupervisorError("Please select at least one workspace");
      return; // Return early to prevent user creation
    }
  
    const { user, error } = await Admin.newUser(data);
  
    if (user && user.role === "supervisor" && selectedWorkspaces.length > 0) {
      await Supervisor.createSupervisor(selectedWorkspaces, user.id);
    }
  
    if (!!user) window.location.reload();
    setError(error);
  };
  

  const user = userFromStorage();

  useEffect(() => {
    async function getWorkspaces() {
      const workspaces = await Workspace.all();
      setWorkspaces(workspaces);
    }
    getWorkspaces();
  }, []);


  const handleWorkspaceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedWorkspaces((prev) => [...prev, value]); // Add the workspace
    } else {
      setSelectedWorkspaces((prev) => prev.filter((workspace) => workspace !== value)); // Remove the workspace
    }
  };

  return (
    <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-lg shadow">
      <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-500/50">
        <h3 className="text-xl font-semibold text-black">
          Add user to instance
        </h3>
        <button
          onClick={closeModal}
          type="button"
          className="transition-all duration-300 text-gray-400 bg-transparent hover:border-white/60 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center bg-white hover:bg-gray-200 hover:border-slate-100 hover:border-opacity-50 border-transparent border"
          data-modal-hide="staticModal"
        >
          <X className="text-gray-700 text-lg" />
        </button>
      </div>
      <div className="overflow-y-auto flex-grow">
        <form onSubmit={handleCreate} className="flex flex-col h-full">
          <div className="p-6 space-y-6">
            <div className="w-full flex flex-col gap-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  className="bg-black bg-opacity-70 text-white placeholder:text-white/70 border-gray-500  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="User's username"
                  minLength={2}
                  required={true}
                  autoComplete="off"
                  pattern="^[a-z0-9_-]+$"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Username must be only contain lowercase letters, numbers, underscores, and hyphens with no spaces"
                    )
                  }
                  onChange={(e) => e.target.setCustomValidity("")}
                />
                <p className="mt-2 text-xs text-black/60">
                  Username must be only contain lowercase letters, numbers,
                  underscores, and hyphens with no spaces
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="bg-black bg-opacity-70 text-white placeholder:text-white/70 border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="User's initial email"
                  required={true}
                  autoComplete="off"
                  minLength={8}
                />
                <p className="mt-2 text-xs text-black/60">
                  email must be of required format
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="text"
                  className="bg-black bg-opacity-70 text-white placeholder:text-white/70 border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="User's initial password"
                  required={true}
                  autoComplete="off"
                  minLength={8}
                />
                <p className="mt-2 text-xs text-black/60">
                  Password must be at least 8 characters long
                </p>
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Role
                </label>
                <select
                  name="role"
                  required={true}
                  defaultValue={"default"}
                  onChange={(e) => setRole(e.target.value)}
                  className="rounded-lg bg-black bg-opacity-70 text-white placeholder:text-white/70 px-4 py-2 text-sm border-gray-500 focus:ring-blue-500 focus:border-blue-500 w-full"
                >
                  <option value="default">Default</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                  {user?.role === "admin" && (
                    <option value="admin">Administrator</option>
                  )}
                </select>
                <RoleHintDisplay role={role} />
              </div>
              {role === "supervisor" && (
                <div>
                  <label
                    htmlFor="workspaceName"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Workspace
                  </label>
                  {workspaces.length === 0 ? (
                    <span className="text-xs text-black/60">No workspaces found</span>
                  ) : (
                    // <select
                    //   name="workspaceName"
                    //   required={true}
                    //   onChange={handleWorkspaceChange}
                    //   value={workspaceName}
                    //   className="rounded-lg bg-black bg-opacity-70 text-white placeholder:text-white/70 px-4 py-2 text-sm border-gray-500 focus:ring-blue-500 focus:border-blue-500 w-full"
                    // >
                    //   <option value="" disabled className="text-white/60">Select a workspace</option>
                    //   {workspaces.map((workspace, index) => (
                    //     <option value={workspace.name} key={index}>
                    //       {workspace.name}
                    //     </option>
                    //   ))}
                    // </select>
                    workspaces.map((workspace, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={workspace.name}
                          onChange={handleWorkspaceChange}
                          checked={selectedWorkspaces.includes(workspace.name)} // Ensure checkbox reflects selected state
                          className="form-checkbox text-blue-500 rounded"
                        />
                        <span className="text-black">{workspace.name}</span>
                      </label>
                    ))
                  )}
                  {(selectedWorkspaces.length !== 0) && (
                    <p className="mt-2 text-xs text-black/60">
                      Selected workspaces: {selectedWorkspaces.join(", ")}
                    
                    </p>
                  )}
                </div>
              )}
              {supervisorError && <p className="text-red-400 text-xs"> {supervisorError}</p>}
              {error && <p className="text-red-400 text-sm">Error: {error}</p>}
              <p className="text-black text-xs md:text-sm">
                After creating a user they will need to login with their initial
                login to get access.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center p-6 space-x-2 border-t border-gray-500/50">
            <button
              onClick={closeModal}
              type="button"
              className="px-4 py-2 rounded-lg text-white bg-stone-900 hover:bg-opacity-80 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="transition-all duration-300 border border-slate-200 px-4 py-2 rounded-lg text-black text-sm items-center flex gap-x-2 bg-slate-200 hover:text-white focus:ring-gray-800 hover:bg-black"
            >
              Add user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
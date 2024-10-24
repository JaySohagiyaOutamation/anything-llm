import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import Admin from "@/models/admin";
import { RoleHintDisplay } from "../..";
import Workspace from "@/models/workspace";
import Supervisor from "@/models/supervisor";

export default function EditUserModal({ currentUser, user, closeModal }) {
  const [role, setRole] = useState(user.role);
  const [workspacesList, setWorkspacesList] = useState([]);
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
  const [selectedWorkspacesToAdd, setSelectedWorkspacesToAdd] = useState([]);
  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    setError(null);
    e.preventDefault();
    const data = {};
    const form = new FormData(e.target);
    for (var [key, value] of form.entries()) {
      if (!value || value === null) continue;
      data[key] = value;
    }
    if (role === "supervisor" && selectedWorkspaces.length > 0) {
      await Supervisor.removeSupervisor(selectedWorkspaces, user.id);
    }
    if (role === "supervisor" && selectedWorkspacesToAdd.length > 0) {
      await Supervisor.createSupervisor(selectedWorkspacesToAdd, user.id);
    }
    const { success, error } = await Admin.updateUser(user.id, data);

    if (success) window.location.reload();
    setError(error);
  };

  const fetchWorkspacesName = async (userId) => {
    try {
      const { workspacesName } = await Workspace.getWorkspacesName(userId);
      setWorkspacesList(workspacesName);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const handleWorkspaceCheckbox = (e, workspace) => {
    if (e.target.checked) {
      // Add the workspace to the selectedWorkspaces array
      setSelectedWorkspaces((prevSelected) => [...prevSelected, workspace]);
    } else {
      // Remove the workspace from the selectedWorkspaces array
      setSelectedWorkspaces((prevSelected) =>
        prevSelected.filter((selected) => selected !== workspace)
      );
    }
  };
  const handleAllWorkspaceCheckbox = (e, workspace) => {
    if (e.target.checked) {
      // Add the workspace to the selectedWorkspaces array
      setSelectedWorkspacesToAdd((prevSelected) => [...prevSelected, workspace]);
    } else {
      // Remove the workspace from the selectedWorkspaces array
      setSelectedWorkspacesToAdd((prevSelected) =>
        prevSelected.filter((selected) => selected !== workspace)
      );
    }
  };
  async function fetchWorkspaces() {
    Workspace.all()
      .then((workspaces) => {
        const workspacesName = workspaces.map((workspace) => { return workspace.name })
        return setAllWorkspaces(workspacesName);
      })
      .catch(() => setAllWorkspaces([]));
  }

  useEffect(() => {
    if (user.role === "supervisor") {
      const userId = user.id;
      fetchWorkspacesName(userId);
      fetchWorkspaces();
    }
  }, [])

  useEffect(() => {
    if (allWorkspaces.length > 0 && workspacesList.length === 0) {
      setFilteredWorkspaces(allWorkspaces); // Update filteredWorkspaces instead of allWorkspaces
    }
    if (allWorkspaces.length > 0 && workspacesList.length > 0) {
      const filtered = allWorkspaces.filter(name => !workspacesList.includes(name));
      setFilteredWorkspaces(filtered); // Update filteredWorkspaces instead of allWorkspaces
    }
  }, [allWorkspaces, workspacesList]);

  return (
    <div className="relative w-[500px] max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow">
        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-500/50">
          <h3 className="text-xl font-semibold text-black">
            Edit {user.username}
          </h3>
          <button
            onClick={closeModal}
            type="button"
            className="transition-all duration-300  bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  hover:bg-[#e4ecf6] hover:border-slate-100 hover:border-opacity-50 border-transparent border"
            data-modal-hide="staticModal"
          >
            <X className="text-black text-lg" />
          </button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="p-6 space-y-6 flex h-full w-full">
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
                  className="bg-black/80 placeholder:text-white/40 border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="User's username"
                  defaultValue={user.username}
                  minLength={2}
                  required={true}
                  autoComplete="off"
                />
                <p className="mt-2 text-xs text-black/80">
                  Username must be only contain lowercase letters, numbers,
                  underscores, and hyphens with no spaces
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  New Password
                </label>
                <input
                  name="password"
                  type="text"
                  className="bg-black/80 placeholder:text-white/40 border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder={`${user.username}'s new password`}
                  autoComplete="off"
                  minLength={8}
                />
                <p className="mt-2 text-xs text-black/80">
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
                  defaultValue={user.role}
                  onChange={(e) => setRole(e.target.value)}
                  className="rounded-lg bg-black/80 px-4 py-2 text-sm text-white border-gray-500 focus:ring-blue-500 focus:border-blue-500 w-full"
                >
                  <option value="default">Default</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                  {currentUser?.role === "admin" && (
                    <option value="admin">Administrator</option>
                  )}
                </select>
                {role === "supervisor" && (
                  <div className="flex justify-between">
                    <div>
                      <label
                        htmlFor="workspaces"
                        className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                      >
                        Remove workspaces
                      </label>

                      {/* List of workspaces with checkboxes */}
                      <div className="mt-2">
                        {workspacesList.map((workspace, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              id={`workspace-${index}`}
                              value={workspace}
                              onChange={(e) => handleWorkspaceCheckbox(e, workspace)}
                              className="mr-2"
                            />
                            <label htmlFor={`workspace-${index}`} className="text-gray-700 text-xs">
                              {workspace}
                            </label>
                          </div>
                        ))}
                      </div>


                    </div>
                    <div>
                      <label
                        htmlFor="workspaces"
                        className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                      >
                        Add workspaces
                      </label>

                      {/* List of workspaces with checkboxes */}
                      <div className="mt-2">
                        {filteredWorkspaces && filteredWorkspaces.map((workspace, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              id={`workspace-${index}`}
                              value={workspace}
                              onChange={(e) => handleAllWorkspaceCheckbox(e, workspace)}
                              className="mr-2"
                            />
                            <label htmlFor={`workspace-${index}`} className="text-gray-700 text-xs">
                              {workspace}
                            </label>
                          </div>
                        ))}
                      </div>


                    </div>
                  </div>
                )}
                <RoleHintDisplay role={role} />
              </div>
              {error && <p className="text-red-400 text-sm">Error: {error}</p>}
            </div>
          </div>
          <div className="flex w-full justify-between items-center p-6 space-x-2 border-t rounded-b border-gray-500/50">
            <button
              onClick={closeModal}
              type="button"
              className="px-4 py-2 rounded-lg text-white bg-black/90 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="transition-all duration-300 border border-slate-200 px-4 py-2 rounded-lg text-black text-sm items-center flex gap-x-2 bg-slate-200 hover:text-slate-800 focus:ring-gray-800"
            >
              Update user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

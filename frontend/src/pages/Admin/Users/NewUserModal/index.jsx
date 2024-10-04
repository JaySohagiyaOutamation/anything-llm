import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import Admin from "@/models/admin";
import { userFromStorage } from "@/utils/request";
import { RoleHintDisplay } from "..";
import Workspace from "@/models/workspace";

export default function NewUserModal({ closeModal }) {
  const [error, setError] = useState(null);
  const [workspaces,setWorkspaces] = useState([]);
  const [selectedWorkspace,setSelectedWorkspace] = useState("");
  const [role, setRole] = useState("default");

  const handleCreate = async (e) => {
    setError(null);
    e.preventDefault();
    const data = {};
    const form = new FormData(e.target);
    for (var [key, value] of form.entries()) data[key] = value;
    const { user, error } = await Admin.newUser(data);
    if (!!user) window.location.reload();
    setError(error);
  };

  const user = userFromStorage();

  useEffect(() => {
    async function getWorkspaces() {
      const workspaces = await Workspace.all();
      console.log('workspaces: ', workspaces);
      setWorkspaces(workspaces);
    }
    getWorkspaces();
  }, []);

  return (
    <div className="relative w-full max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow">
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
        <form onSubmit={handleCreate}>
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
              {role === "supervisor" && 
                <div>
                <label
                  htmlFor="selectedWorkspace"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Workspace
                </label>
                <select
                  name="selectedWorkspace"
                  required={true}
                  onChange={(e) => setSelectedWorkspace(e.target.value)}
                  className="rounded-lg bg-black bg-opacity-70 text-white placeholder:text-white/70 px-4 py-2 text-sm border-gray-500 focus:ring-blue-500 focus:border-blue-500 w-full"
                >
                  
                {workspaces.map((workspace,index) => <option value={`${workspace.name}`} key={index}>{workspace.name}</option>
                 )}
               
                </select>
              
              </div>
              }
              {error && <p className="text-red-400 text-sm">Error: {error}</p>}
              <p className="text-black text-xs md:text-sm">
                After creating a user they will need to login with their initial
                login to get access.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center p-6 space-x-2 border-t rounded-b border-gray-500/50">
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

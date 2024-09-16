import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import Document from "@/models/document";

export default function NewFolderModal({ closeModal, files, setFiles }) {
  const [error, setError] = useState(null);
  const [folderName, setFolderName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    if (folderName.trim() !== "") {
      const newFolder = {
        name: folderName,
        type: "folder",
        items: [],
      };
      const { success } = await Document.createFolder(folderName);
      if (success) {
        setFiles({
          ...files,
          items: [...files.items, newFolder],
        });
        closeModal();
      } else {
        setError("Failed to create folder");
      }
    }
  };

  return (
    <div className="relative w-full max-w-xl max-h-full">
      <div className="relative bg-white rounded-lg shadow">
        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-500/50">
          <h3 className="text-xl font-semibold text-black">
            Create New Folder
          </h3>
          <button
            onClick={closeModal}
            type="button"
            className="transition-all duration-300 text-gray-400 bg-transparent hover:border-white/60 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-[#c3d1e1] hover:border-slate-100 hover:border-opacity-50 border-transparent border"
            data-modal-hide="staticModal"
          >
            <X className="text-black text-lg" />
          </button>
        </div>
        <form onSubmit={handleCreate}>
          <div className="p-6 space-y-6 flex h-full w-full">
            <div className="w-full flex flex-col gap-y-4">
              <div>
                <label
                  htmlFor="folderName"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Folder Name
                </label>
                <input
                  name="folderName"
                  type="text"
                  className="bg-[#acbaca] placeholder:text-gray-100 border-gray-500 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter folder name"
                  required={true}
                  autoComplete="off"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              {error && <p className="text-red-400 text-sm">Error: {error}</p>}
            </div>
          </div>
          <div className="flex w-full justify-between items-center p-6 space-x-2 border-t rounded-b border-gray-500/50">
            <button
              onClick={closeModal}
              type="button"
              className="px-4 py-2 rounded-lg text-white bg-stone-900 transition-all duration-300 hover:bg-opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="transition-all duration-300 border border-slate-200 px-4 py-2 rounded-lg text-white text-sm items-center flex gap-x-2 bg-black hover:bg-opacity-70 focus:ring-gray-800"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

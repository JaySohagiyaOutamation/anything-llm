import { ArrowsDownUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Workspace from "../../../../models/workspace";
import System from "../../../../models/system";
import showToast from "../../../../utils/toast";
import Directory from "./Directory";
import WorkspaceDirectory from "./WorkspaceDirectory";
import useUser from "@/hooks/useUser";

const MODEL_COSTS = {
  "text-embedding-ada-002": 0.0000001,
  "text-embedding-3-small": 0.00000002,
  "text-embedding-3-large": 0.00000013,
};

export default function DocumentSettings({ workspace, systemSettings }) {
  const { user } = useUser();
  const [highlightWorkspace, setHighlightWorkspace] = useState(false);
  const [availableDocs, setAvailableDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workspaceDocs, setWorkspaceDocs] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [movedItems, setMovedItems] = useState([]);
  const [embeddingsCost, setEmbeddingsCost] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  async function fetchKeys(refetchWorkspace = false) {
    setLoading(true);
    const localFiles = await System.localFiles();
    const currentWorkspace = refetchWorkspace
      ? await Workspace.bySlug(workspace.slug)
      : workspace;

    const documentsInWorkspace =
      currentWorkspace.documents.map((doc) => doc.docpath) || [];

    // Filter documents based on user role
    const filterDocuments = (folder) => {
      if (user.role === 'supervisor') {
        // For supervisor, filter items in each folder
        return folder.items.filter(item => {
          // Check if the item has the required properties
          return (
            item.role === 'supervisor' &&
            String(item.workspaceId) === String(currentWorkspace.id)
          );
        });
      }
      return folder.items;
    };

    // Documents that are not in the workspace
    const availableDocs = {
      ...localFiles,
      items: localFiles.items.map((folder) => {
        if (folder.type === "folder") {
          const filteredItems = filterDocuments({ ...folder });
          return {
            ...folder,
            items: filteredItems.filter(
              (file) =>
                file.type === "file" &&
                !documentsInWorkspace.includes(`${folder.name}/${file.name}`)
            ),
          };
        }
        return folder;
      }),
    };

    // Documents that are already in the workspace
    const workspaceDocs = {
      ...localFiles,
      items: localFiles.items.map((folder) => {
        if (folder.type === "folder") {
          const filteredItems = filterDocuments({ ...folder });
          return {
            ...folder,
            items: filteredItems.filter(
              (file) =>
                file.type === "file" &&
                documentsInWorkspace.includes(`${folder.name}/${file.name}`)
            ),
          };
        }
        return folder;
      }),
    };

    // Remove empty folders
    availableDocs.items = availableDocs.items.filter(
      (folder) => folder.items && folder.items.length > 0
    );
    workspaceDocs.items = workspaceDocs.items.filter(
      (folder) => folder.items && folder.items.length > 0
    );

    setAvailableDocs(availableDocs);
    setWorkspaceDocs(workspaceDocs);
    setLoading(false);
  }

  useEffect(() => {
    fetchKeys(true);
  }, []);

  const updateWorkspace = async (e) => {
    e.preventDefault();
    setLoading(true);
    showToast("Updating workspace...", "info", { autoClose: false });
    setLoadingMessage("This may take a while for large documents");

    const changesToSend = {
      adds: movedItems.map((item) => `${item.folderName}/${item.name}`),
    };

    setSelectedItems({});
    setHasChanges(false);
    setHighlightWorkspace(false);
    
    try {
      const res = await Workspace.modifyEmbeddings(workspace.slug, changesToSend);
      if (!!res.message) {
        showToast(`Error: ${res.message}`, "error", { clear: true });
        return;
      }
      showToast("Workspace updated successfully.", "success", {
        clear: true,
      });

      setMovedItems([]);
      await fetchKeys(true);
    } catch (error) {
      showToast(`Workspace update failed: ${error}`, "error", {
        clear: true,
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const moveSelectedItemsToWorkspace = () => {
    setHighlightWorkspace(false);
    setHasChanges(true);

    const newMovedItems = [];

    for (const itemId of Object.keys(selectedItems)) {
      for (const folder of availableDocs.items) {
        const foundItem = folder.items.find((file) => file.id === itemId);
        if (foundItem) {
          newMovedItems.push({ ...foundItem, folderName: folder.name });
          break;
        }
      }
    }

    let totalTokenCount = 0;
    newMovedItems.forEach((item) => {
      const { cached, token_count_estimate } = item;
      if (!cached) {
        totalTokenCount += token_count_estimate;
      }
    });

    if (systemSettings?.EmbeddingEngine === "openai") {
      const COST_PER_TOKEN =
        MODEL_COSTS[
          systemSettings?.EmbeddingModelPref || "text-embedding-ada-002"
        ];
      const dollarAmount = (totalTokenCount / 1000) * COST_PER_TOKEN;
      setEmbeddingsCost(dollarAmount);
    }

    setMovedItems([...movedItems, ...newMovedItems]);

    let newAvailableDocs = JSON.parse(JSON.stringify(availableDocs));
    let newWorkspaceDocs = JSON.parse(JSON.stringify(workspaceDocs));

    for (const itemId of Object.keys(selectedItems)) {
      let foundItem = null;
      let foundFolderIndex = null;

      // Remove from available docs
      newAvailableDocs.items = newAvailableDocs.items.map(
        (folder, folderIndex) => {
          const remainingItems = folder.items.filter((file) => {
            const match = file.id === itemId;
            if (match) {
              foundItem = { ...file };
              foundFolderIndex = folderIndex;
            }
            return !match;
          });

          return {
            ...folder,
            items: remainingItems,
          };
        }
      );

      // Add to workspace docs
      if (foundItem) {
        const targetFolder = newWorkspaceDocs.items.find(
          (f) => f.name === availableDocs.items[foundFolderIndex].name
        );

        if (targetFolder) {
          if (!targetFolder.items) {
            targetFolder.items = [];
          }
          targetFolder.items.push(foundItem);
        } else {
          // Create new folder if it doesn't exist in workspace docs
          newWorkspaceDocs.items.push({
            name: availableDocs.items[foundFolderIndex].name,
            type: "folder",
            items: [foundItem],
          });
        }
      }
    }

    // Remove empty folders
    newAvailableDocs.items = newAvailableDocs.items.filter(
      (folder) => folder.items && folder.items.length > 0
    );

    setAvailableDocs(newAvailableDocs);
    setWorkspaceDocs(newWorkspaceDocs);
    setSelectedItems({});
  };

  return (
    <div className="flex upload-modal-mt-6 z-10 relative">
      <Directory
        files={availableDocs}
        setFiles={setAvailableDocs}
        loading={loading}
        loadingMessage={loadingMessage}
        setLoading={setLoading}
        workspace={workspace}
        fetchKeys={fetchKeys}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        updateWorkspace={updateWorkspace}
        highlightWorkspace={highlightWorkspace}
        setHighlightWorkspace={setHighlightWorkspace}
        moveToWorkspace={moveSelectedItemsToWorkspace}
        setLoadingMessage={setLoadingMessage}
      />
      <div className="upload-modal-arrow">
        <ArrowsDownUp className="text-black text-base font-bold rotate-90 w-11 h-11" />
      </div>
      <WorkspaceDirectory
        workspace={workspace}
        files={workspaceDocs}
        highlightWorkspace={highlightWorkspace}
        loading={loading}
        loadingMessage={loadingMessage}
        setLoadingMessage={setLoadingMessage}
        setLoading={setLoading}
        fetchKeys={fetchKeys}
        hasChanges={hasChanges}
        saveChanges={updateWorkspace}
        embeddingCosts={embeddingsCost}
        movedItems={movedItems}
      />
    </div>
  );
}
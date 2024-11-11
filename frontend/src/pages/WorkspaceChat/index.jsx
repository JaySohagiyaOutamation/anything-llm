import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { default as WorkspaceChatContainer } from "@/components/WorkspaceChat";
import Sidebar from "@/components/Sidebar";
import { useParams } from "react-router-dom";
import Workspace from "@/models/workspace";
import PasswordModal, { usePasswordModal } from "@/components/Modals/Password";
import { isMobile } from "react-device-detect";
import { FullScreenLoader } from "@/components/Preloader";

const AUTH_TOKEN = "AUTH_TOKEN";
const AUTH_USER = "AUTH_USER";

export default function WorkspaceChat() {
  const { loading, requiresAuth, mode } = usePasswordModal();

  if (loading) return <FullScreenLoader />;
  if (requiresAuth !== false) {
    return <>{requiresAuth !== null && <PasswordModal mode={mode} />}</>;
  }

  return <ShowWorkspaceChat />;
}

function ShowWorkspaceChat() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // New auth check state

  useEffect(() => {
    // Check if token exists in local storage
    const token = window.localStorage.getItem(AUTH_TOKEN);
    const user = window.localStorage.getItem(AUTH_USER);

    if (!token || !user) {
      // If missing, redirect to login
      navigate("/login");
    } else {
      // Token exists, allow to load workspace
      setIsCheckingAuth(false);
    }
  }, [navigate]);

  useEffect(() => {
    // Only run workspace loading after auth check completes
    if (!isCheckingAuth && slug) {
      async function getWorkspace() {
        const _workspace = await Workspace.bySlug(slug);
        if (!_workspace) {
          setLoading(false);
          return;
        }
        const suggestedMessages = await Workspace.getSuggestedMessages(slug);
        const pfpUrl = await Workspace.fetchPfp(slug);
        setWorkspace({
          ..._workspace,
          suggestedMessages,
          pfpUrl,
        });
        setLoading(false);
      }
      getWorkspace();
    }
  }, [isCheckingAuth, slug]);

  // Wait until auth check is complete
  if (isCheckingAuth) return <FullScreenLoader />;

  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-white flex">
        {!isMobile && <Sidebar />}
        <WorkspaceChatContainer loading={loading} workspace={workspace} />
      </div>
    </>
  );
}

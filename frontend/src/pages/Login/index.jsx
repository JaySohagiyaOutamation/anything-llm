import React from 'react';
import { Navigate } from 'react-router-dom';
import useQuery from "@/hooks/useQuery";
import { FullScreenLoader } from "@/components/Preloader";
import paths from "@/utils/paths";
import PasswordModal, { usePasswordModal } from "@/components/Modals/Password";

export default function Login() {
  const query = useQuery();
  const { loading, requiresAuth, mode } = usePasswordModal(!!query.get("nt"));

 

 
  if (loading) return <FullScreenLoader />;
  if (requiresAuth === false) return <Navigate to={paths.home()} />;

  return (
    <div>
      {/* Password Modal, if applicable */}
      {/* Google Login Button */}
      <div style={{ marginTop: '20px' }}>
      
      <PasswordModal mode={mode} />

      </div>
    </div>
  );
}

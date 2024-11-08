import React, { useState, useEffect, useRef } from "react";
import System from "../../../models/system";
import SingleUserAuth from "./SingleUserAuth";
import MultiUserAuth from "./MultiUserAuth";
import {
  AUTH_TOKEN,
  AUTH_USER,
  AUTH_TIMESTAMP,
} from "../../../utils/constants";
import useLogo from "../../../hooks/useLogo";
import illustration from "@/media/illustrations/login-illustration.svg";

export default function PasswordModal({ mode = "single" }) {
  const { loginLogo } = useLogo();
  const googleButtonRef = useRef(null); // Reference for the Google button

  // Google sign-in callback
  const handleGoogleSignIn = async (response) => {
    const token = response.credential; // This is the Google token received
    try {
      // Verify token with backend and handle login
      const res = await System.googleSSOLogin(token); // Backend endpoint to verify Google token
      if (res?.payload) {
        // Store auth details in localStorage
        window.localStorage.setItem(AUTH_USER, JSON.stringify(res.user));
        window.localStorage.setItem(AUTH_TOKEN, res.token);
        window.localStorage.setItem(AUTH_TIMESTAMP, Number(new Date()));
        // Redirect or update UI as needed
      } else {
        console.error("Google sign-in failed:", res.message);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  useEffect(() => {
    if (googleButtonRef.current) {
      // Initialize Google Sign-In button with the callback
      window.google.accounts.id.initialize({
        client_id: "895208350570-n1965so7sn576248vqotjummjo3pska1.apps.googleusercontent.com", // Replace with your Google Client ID
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
      });
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-white flex flex-col md:flex-row items-center justify-center">
      <div
        style={{
          background: `
            radial-gradient(circle at center, transparent 40%, black 100%),
            linear-gradient(180deg, #85F8FF 0%, #65A6F2 100%)
          `,
          width: "575px",
          filter: "blur(150px)",
          opacity: "0.4",
        }}
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
      <div className="hidden md:flex md:w-1/2 md:h-full md:items-center md:justify-center">
        <img
          className="w-full h-full object-contain z-50"
          src={illustration}
          alt="login illustration"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 z-50 relative -mt-20">
        <img
          src={loginLogo}
          alt="Logo"
          className={`hidden relative z-20 md:flex rounded-2xl w-fit m-4 ${
            mode === "single" ? "md:top-2" : "md:top-12"
          } absolute max-h-[65px] md:bg-white md:shadow-[0_4px_14px_rgba(0,0,0,0.25)]`}
          style={{ objectFit: "contain" }}
        />
        {/* Render Google Sign-In button */}
        {mode === "single" ? <SingleUserAuth /> : <MultiUserAuth />}
        <div ref={googleButtonRef} className="mb-6"></div>
      </div>
    </div>
  );
}


export function usePasswordModal(notry = false) {
  const [auth, setAuth] = useState({
    loading: true,
    requiresAuth: false,
    mode: "single",
  });

  useEffect(() => {
    async function checkAuthReq() {
      if (!window) return;

      // If the last validity check is still valid
      // we can skip the loading.
      if (!System.needsAuthCheck() && notry === false) {
        setAuth({
          loading: false,
          requiresAuth: false,
          mode: "multi",
        });
        return;
      }

      const settings = await System.keys();
      if (settings?.MultiUserMode) {
        const currentToken = window.localStorage.getItem(AUTH_TOKEN);
        if (!!currentToken) {
          const valid = notry ? false : await System.checkAuth(currentToken);
          if (!valid) {
            setAuth({
              loading: false,
              requiresAuth: true,
              mode: "multi",
            });
            window.localStorage.removeItem(AUTH_USER);
            window.localStorage.removeItem(AUTH_TOKEN);
            window.localStorage.removeItem(AUTH_TIMESTAMP);
            return;
          } else {
            setAuth({
              loading: false,
              requiresAuth: false,
              mode: "multi",
            });
            return;
          }
        } else {
          setAuth({
            loading: false,
            requiresAuth: true,
            mode: "multi",
          });
          return;
        }
      } else {
        // Running token check in single user Auth mode.
        // If Single user Auth is disabled - skip check
        const requiresAuth = settings?.RequiresAuth || false;
        if (!requiresAuth) {
          setAuth({
            loading: false,
            requiresAuth: false,
            mode: "single",
          });
          return;
        }

        const currentToken = window.localStorage.getItem(AUTH_TOKEN);
        if (!!currentToken) {
          const valid = notry ? false : await System.checkAuth(currentToken);
          if (!valid) {
            setAuth({
              loading: false,
              requiresAuth: true,
              mode: "single",
            });
            window.localStorage.removeItem(AUTH_TOKEN);
            window.localStorage.removeItem(AUTH_USER);
            window.localStorage.removeItem(AUTH_TIMESTAMP);
            return;
          } else {
            setAuth({
              loading: false,
              requiresAuth: false,
              mode: "single",
            });
            return;
          }
        } else {
          setAuth({
            loading: false,
            requiresAuth: true,
            mode: "single",
          });
          return;
        }
      }
    }
    checkAuthReq();
  }, []);

  return auth;
}

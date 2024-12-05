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
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Admin from "@/models/admin";
import { PublicClientApplication } from "@azure/msal-browser"; // Microsoft OAuth
import { MsalProvider, useMsal, useAccount } from "@azure/msal-react"; // Microsoft Authentication React hooks


// export default function PasswordModal({ mode = "single" }) {
//   const { loginLogo } = useLogo();
//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-white flex flex-col md:flex-row items-center justify-center">
//       <div
//         style={{
//           background: `
//     radial-gradient(circle at center, transparent 40%, black 100%),
//     linear-gradient(180deg, #85F8FF 0%, #65A6F2 100%)
//   `,
//           width: "575px",
//           filter: "blur(150px)",
//           opacity: "0.4",
//         }}
//         className="absolute left-0 top-0 z-0 h-full w-full"
//       />
//       <div className="hidden md:flex md:w-1/2 md:h-full md:items-center md:justify-center">
//         <img
//           className="w-full h-full object-contain z-50"
//           src={illustration}
//           alt="login illustration"
//         />
//       </div>
//       <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 z-50 relative -mt-20">
//         <img
//           src={loginLogo}
//           alt="Logo"
//           className={`hidden relative z-20 md:flex rounded-2xl w-fit m-4 ${
//             mode === "single" ? "md:top-2" : "md:top-12"
//           } absolute max-h-[65px] md:bg-white md:shadow-[0_4px_14px_rgba(0,0,0,0.25)]`}
//           style={{ objectFit: "contain" }}
//         />
//         {mode === "single" ? <SingleUserAuth /> : <MultiUserAuth />}
//       </div>
//     </div>
//   );
// }


// export default function PasswordModal({ mode = "single" }) {
//   const { loginLogo } = useLogo();
//   const googleButtonRef = useRef(null);

//   useEffect(() => {
//     if (googleButtonRef.current) {
//       // Initialize Google Sign-In
//       window.google.accounts.id.initialize({
//         client_id: "445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com",
//         callback: handleGoogleSignIn,
//       });

//       // Render Google Sign-In button
//       window.google.accounts.id.renderButton(googleButtonRef.current, {
//         theme: "outline",
//         size: "large",
//         text: "continue_with",
//       });
//     }
//   }, []);

//   const handleGoogleSignIn = async (response) => {
//     const token = response.credential;

//     try {
//       const res = await fetch("http://localhost:3001/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem(AUTH_TOKEN, data.token);
//         localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
//         window.location.href = "/workspace/general"; // Redirect to desired workspace
//       } else {
//         console.error("Google Sign-In failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-white flex flex-col md:flex-row items-center justify-center">
//       <div
//         style={{
//           background: `
//             radial-gradient(circle at center, transparent 40%, black 100%),
//             linear-gradient(180deg, #85F8FF 0%, #65A6F2 100%)
//           `,
//           width: "575px",
//           filter: "blur(150px)",
//           opacity: "0.4",
//         }}
//         className="absolute left-0 top-0 z-0 h-full w-full"
//       />
//       <div className="hidden md:flex md:w-1/2 md:h-full md:items-center md:justify-center">
//         <img
//           className="w-full h-full object-contain z-50"
//           src={illustration}
//           alt="login illustration"
//         />
//       </div>
//       <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 z-50 relative -mt-20">
//         <img
//           src={loginLogo}
//           alt="Logo"
//           className={`hidden relative z-20 md:flex rounded-2xl w-fit m-4 ${
//             mode === "single" ? "md:top-2" : "md:top-12"
//           } absolute max-h-[65px] md:bg-white md:shadow-[0_4px_14px_rgba(0,0,0,0.25)]`}
//           style={{ objectFit: "contain" }}
//         />
//         {mode === "single" ? <SingleUserAuth /> : <MultiUserAuth />}
//         <div ref={googleButtonRef} className="mt-4" />
//       </div>
//     </div>
//   );
// }

// export default function PasswordModal({ mode = "single" }) {
//   const { loginLogo } = useLogo();
 
//   // Google Login callback
//   const handleGoogleSignIn = async (response) => {
//     const token = response.credential;
 
//     try {
//       const res = await fetch("http://localhost:3001/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });
 
//       const data = await res.json();
//       console.log('data: ', data);
//       setTimeout(() => {console.log(data);},10000)
//       // console.log('data: ', data);
 
//       if (data.success) {
//         localStorage.setItem(AUTH_TOKEN, data.token);
//         localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
//         window.location.href = "/workspace/general"; // Redirect to desired workspace
//       } else {
//         console.error("Google Sign-In failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error);
//     }
//   };
 
//   return (
// <GoogleOAuthProvider clientId="445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com">
// <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-white flex flex-col md:flex-row items-center justify-center">
// <div
//           style={{
//             background: `
//               radial-gradient(circle at center, transparent 40%, black 100%),
//               linear-gradient(180deg, #85F8FF 0%, #65A6F2 100%)
//             `,
//             width: "575px",
//             filter: "blur(150px)",
//             opacity: "0.4",
//           }}
//           className="absolute left-0 top-0 z-0 h-full w-full"
//         />
// <div className="hidden md:flex md:w-1/2 md:h-full md:items-center md:justify-center">
// <img
//             className="w-full h-full object-contain z-50"
//             src={illustration}
//             alt="login illustration"
//           />
// </div>
// <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 z-50 relative -mt-20">
// <img
//             src={loginLogo}
//             alt="Logo"
//             className={`hidden relative z-20 md:flex rounded-2xl w-fit m-4 ${
//               mode === "single" ? "md:top-2" : "md:top-12"
//             } absolute max-h-[65px] md:bg-white md:shadow-[0_4px_14px_rgba(0,0,0,0.25)]`}
//             style={{ objectFit: "contain" }}
//           />
//           {mode === "single" ? <SingleUserAuth /> : <MultiUserAuth />}
//           {/* Google Login Button */}
// <GoogleLogin 
//             onSuccess={handleGoogleSignIn}
//             onError={() => console.log('Login Failed')}
//           />
// </div>
// </div>
// </GoogleOAuthProvider>
//   );
// }

// export default function PasswordModal({ mode = "single" }) {
//   const { loginLogo } = useLogo();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleGoogleSignIn = async (response) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const token = response.credential;
//       const res = await Admin.authGoogle(token);
//       console.log(res);
//       if (res.success) {
//         localStorage.setItem(AUTH_TOKEN, res.token);
//         localStorage.setItem(AUTH_USER, JSON.stringify(res.user));
//         localStorage.setItem(AUTH_TIMESTAMP, Date.now());

//         // Optional: Add role-based redirection
//         window.location.href = "/"; 
//       } else {
//         setError(res.message || "Google Sign-In failed");
//         console.error("Google Sign-In failed:", res.message);
//       }
//     } catch (error) {
//       // Detailed error logging
//       console.error('Full error object:', error);
//       console.error('Error response:', error.response);
//       console.error('Error request:', error.request);
//       console.error('Error message:', error.message);

//       // Specific error handling
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setError(`Server Error: ${error.response.res.message || error.response.statusText}`);
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError('No response received from server. Please check your network connection.');
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setError(`Error: ${error.message}`);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
 
//   // return (
//   //   <GoogleOAuthProvider 
//   //     clientId="445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com"
//   //   >
//   //     <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-white flex flex-col md:flex-row items-center justify-center">
//   //       <div
//   //         style={{
//   //           background: `
//   //             radial-gradient(circle at center, transparent 40%, black 100%),
//   //             linear-gradient(180deg, #85F8FF 0%, #65A6F2 100%)
//   //           `,
//   //           width: "575px",
//   //           filter: "blur(150px)",
//   //           opacity: "0.4",
//   //         }}
//   //         className="absolute left-0 top-0 z-0 h-full w-full"
//   //       />
//   //       <div className="hidden md:flex md:w-1/2 md:h-full md:items-center md:justify-center">
//   //         <img
//   //           className="w-full h-full object-contain z-50"
//   //           src={illustration}
//   //           alt="login illustration"
//   //         />
//   //       </div>
//   //       <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 z-50 relative -mt-20">
//   //         <img
//   //           src={loginLogo}
//   //           alt="Logo"
//   //           className={`hidden relative z-20 md:flex rounded-2xl w-fit m-4 ${
//   //             mode === "single" ? "md:top-2" : "md:top-12"
//   //           } absolute max-h-[65px] md:bg-white md:shadow-[0_4px_14px_rgba(0,0,0,0.25)]`}
//   //           style={{ objectFit: "contain" }}
//   //         />
//   //         {mode === "single" ? <SingleUserAuth /> : <MultiUserAuth />}
          
//   //         {/* Google Login Button */}
//   //         <GoogleLogin 
//   //         onSuccess={handleGoogleSignIn}
//   //         onError={() => {
//   //           setError('Google Sign-In failed');
//   //           console.log('Login Failed');
//   //         }}
//   //         disabled={isLoading}
//   //       />
//   //       </div>
//   //     </div>
//   //   </GoogleOAuthProvider>
//   // );

//   // return (
//   //   <GoogleOAuthProvider 
//   //     clientId="445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com"
//   //   >
//   //     <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-white flex flex-col md:flex-row items-center justify-center">
//   //       <div
//   //         style={{
//   //           background: `
//   //             radial-gradient(circle at center, transparent 40%, black 100%),
//   //             linear-gradient(180deg, #85F8FF 0%, #65A6F2 100%)
//   //           `,
//   //           width: "575px",
//   //           filter: "blur(150px)",
//   //           opacity: "0.4",
//   //         }}
//   //         className="absolute left-0 top-0 z-0 h-full w-full"
//   //       />
//   //       <div className="hidden md:flex md:w-1/2 md:h-full md:items-center md:justify-center">
//   //         <img
//   //           className="w-full h-full object-contain z-50"
//   //           src={illustration}
//   //           alt="login illustration"
//   //         />
//   //       </div>
//   //       <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 z-50 relative -mt-20">
//   //         <img
//   //           src={loginLogo}
//   //           alt="Logo"
//   //           className={`hidden relative z-20 md:flex rounded-2xl w-fit m-4 ${
//   //             mode === "single" ? "md:top-2" : "md:top-12"
//   //           } absolute max-h-[65px] md:bg-white md:shadow-[0_4px_14px_rgba(0,0,0,0.25)]`}
//   //           style={{ objectFit: "contain" }}
//   //         />
//   //         {mode === "single" ? <SingleUserAuth isLoading={isLoading} handleGoogleSignIn={handleGoogleSignIn}/> : <MultiUserAuth  isLoading={isLoading} handleGoogleSignIn={handleGoogleSignIn}/>}
  
//   //         {/* Spacer for separating Google Login */}
//   //         {/* <div className="mt-8 w-full flex justify-center">
//   //           <GoogleLogin
//   //             onSuccess={handleGoogleSignIn}
//   //             onError={() => {
//   //               setError("Google Sign-In failed");
//   //               console.log("Login Failed");
//   //             }}
//   //             disabled={isLoading}
//   //           />
//   //         </div> */}
//   //       </div>
//   //     </div>
//   //   </GoogleOAuthProvider>
//   // );
  

// }

// const msalConfig = {
//   auth: {
//     clientId: "a0f64050-6cbd-44da-93e8-159582b11c98",
//     authority: "https://login.microsoftonline.com/d0dd8c54-2968-4466-a8e7-9684352ae906",
//     redirectUri: "http://localhost:3000",
//   },
// };

// const msalInstance = new PublicClientApplication(msalConfig);

export default function PasswordModal({ mode = "single" }) {
  const { loginLogo } = useLogo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { instance } = useMsal();

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    setError(null); 

    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["https://graph.microsoft.com/User.Read"],        
      });

      const token = loginResponse.accessToken; // Use the ID token or access token
      const res = await Admin.authMicrosoft(token); // Replace with your API logic

      if (res.success) {
        localStorage.setItem(AUTH_TOKEN, res.token);
        localStorage.setItem(AUTH_USER, JSON.stringify(res.user));
        localStorage.setItem(AUTH_TIMESTAMP, Date.now());
        window.location.href = "/";
      } else {
        setError(res.message || "Microsoft Sign-In failed");
        console.error("Microsoft Sign-In failed:", res.message);
      }
    } catch (error) {
      console.error("Error during Microsoft Sign-In:", error);
      setError(error.message || "An error occurred during Microsoft Sign-In.");
    } finally {
      setIsLoading(false);
    }
  };

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
          {mode === "single" ? (
            <SingleUserAuth
          
            />
          ) : (
            <MultiUserAuth
            />
          )}

          <button
            onClick={handleMicrosoftSignIn}
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isLoading ? "Signing in..." : "Sign in with Microsoft"}
          </button>
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

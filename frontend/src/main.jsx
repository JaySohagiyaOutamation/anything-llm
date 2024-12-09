import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "@/App.jsx";
import "@/index.css";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
const isDev = process.env.NODE_ENV !== "production";
const REACTWRAP = isDev ? React.Fragment : React.StrictMode;

const msalConfig = {
  auth: {
    clientId: "process.env.REACT_APP_CLIENT_ID",
    authority: "process.env.REACT_APP_AUTHORITY",
    redirectUri: "process.env.REACT_APP_REDIRECT_URI",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <REACTWRAP>
    <Router>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </Router>
  </REACTWRAP>
);

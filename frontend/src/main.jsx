import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "@/App.jsx";
import "@/index.css";
const isDev = process.env.NODE_ENV !== "production";
import { GoogleOAuthProvider } from '@react-oauth/google';
const REACTWRAP = isDev ? React.Fragment : React.StrictMode;

ReactDOM.createRoot(document.getElementById("root")).render(

  <REACTWRAP>
  <GoogleOAuthProvider clientId="895208350570-n1965so7sn576248vqotjummjo3pska1.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
    </GoogleOAuthProvider>
  </REACTWRAP>
);

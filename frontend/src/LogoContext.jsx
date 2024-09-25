import { createContext, useEffect, useState } from "react";
import OutamationLLM from "../public/outamation-llm.png";
import DefaultLoginLogo from "../public/favicon.png";
import System from "./models/system";
import { OUTAMATION_LOGO_URL } from "./utils/constants";

export const LogoContext = createContext();

export function LogoProvider({ children }) {
  const [logo, setLogo] = useState("");
  const [loginLogo, setLoginLogo] = useState("");
  const [isCustomLogo, setIsCustomLogo] = useState(false);

  useEffect(() => {
    async function fetchInstanceLogo() {
      try {
        const { isCustomLogo } = await System.fetchLogo();
        const logoURL = OUTAMATION_LOGO_URL;
        if (logoURL) {
          setLogo(logoURL);
          setLoginLogo(isCustomLogo ? logoURL : DefaultLoginLogo);
          setIsCustomLogo(isCustomLogo);
        } else {
          setLogo(OutamationLLM);
          setLoginLogo(DefaultLoginLogo);
          setIsCustomLogo(false);
        }
      } catch (err) {
        setLogo(OutamationLLM);
        setLoginLogo(DefaultLoginLogo);
        setIsCustomLogo(false);
        console.error("Failed to fetch logo:", err);
      }
    }

    fetchInstanceLogo();
  }, []);

  return (
    <LogoContext.Provider value={{ logo, setLogo, loginLogo, isCustomLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export const AUTH_USER = "anythingllm_user";
export const AUTH_TOKEN = "anythingllm_authToken";
export const AUTH_TIMESTAMP = "anythingllm_authTimestamp";
export const COMPLETE_QUESTIONNAIRE = "anythingllm_completed_questionnaire";
export const SEEN_DOC_PIN_ALERT = "anythingllm_pinned_document_alert";
export const SEEN_WATCH_ALERT = "anythingllm_watched_document_alert";

export const USER_BACKGROUND_COLOR = "bg-[#e4ecf6]";
export const AI_BACKGROUND_COLOR = "bg-[#f8fafe]";

export const OLLAMA_COMMON_URLS = [
  "http://127.0.0.1:11434",
  "http://host.docker.internal:11434",
  "http://172.17.0.1:11434",
];

export const LMSTUDIO_COMMON_URLS = [
  "http://localhost:1234/v1",
  "http://127.0.0.1:1234/v1",
  "http://host.docker.internal:1234/v1",
  "http://172.17.0.1:1234/v1",
];

export const KOBOLDCPP_COMMON_URLS = [
  "http://127.0.0.1:5000/v1",
  "http://localhost:5000/v1",
  "http://host.docker.internal:5000/v1",
  "http://172.17.0.1:5000/v1",
];

export const LOCALAI_COMMON_URLS = [
  "http://127.0.0.1:8080/v1",
  "http://localhost:8080/v1",
  "http://host.docker.internal:8080/v1",
  "http://172.17.0.1:8080/v1",
];

export function fullApiUrl() {
  if (API_BASE !== "/api") return API_BASE;
  return `${window.location.origin}/api`;
}

export const POPUP_BROWSER_EXTENSION_EVENT = "NEW_BROWSER_EXTENSION_CONNECTION";

export const OUTAMATION_LOGO_URL = "https://outamation.com/wp-content/uploads/2022/01/hori-logo-1-e1657530120873-2048x522.png"
export const OUTAMATION_ICON_URL = "https://outamation.com/wp-content/uploads/2022/06/favicon-150x150.png"

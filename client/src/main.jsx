import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

// Existing screens use localhost URLs. Rewrite only that development origin so
// the deployed bundle uses VITE_API_URL without changing every API call.
if (apiUrl) {
  axios.interceptors.request.use((config) => {
    if (typeof config.url === "string" && config.url.startsWith("http://localhost:5000")) {
      config.url = `${apiUrl}${config.url.slice("http://localhost:5000".length)}`;
    }
    return config;
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

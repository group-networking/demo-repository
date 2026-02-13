import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./global.css";
import "./style.css";
import "./theme.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);

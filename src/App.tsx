

import "./global.css";
import "./style.css";


import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

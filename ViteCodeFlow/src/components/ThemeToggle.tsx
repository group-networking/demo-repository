import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-purple-600 text-white"
    >
      {theme === "light" ? "🌙 Escuro" : "☀️ Claro"}
    </button>
  );
}

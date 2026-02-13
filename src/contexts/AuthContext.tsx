import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  function login(name: string) {
    const next: User = { name };
    setUser(next);
    try {
      localStorage.setItem("auth_user", JSON.stringify(next));
    } catch {}
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem("auth_user");
    } catch {}
  }

  function updateAvatar(avatar: string) {
    // If there's no user, create a minimal guest user so avatar can be stored and shown in UI
    const next = user ? { ...user, avatar } : { name: "Usuário", avatar };
    setUser(next);
    try {
      localStorage.setItem("auth_user", JSON.stringify(next));
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

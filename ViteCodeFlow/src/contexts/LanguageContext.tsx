import { createContext, useContext, useState } from "react";

type Lang = "pt" | "en";

const texts = {
  pt: {
    welcome: "Bem-vindo",
    settings: "Configurações",
    navbar: {
      about: "Sobre",
      login: "Entrar",
      register: "Registrar",
      projects: "Projetos",
    },
    login: {
      title: "Entrar",
      email: "Email",
      password: "Senha",
      submit: "Entrar",
      close: "Fechar",
    },
    register: {
      title: "Registrar",
      name: "Nome",
      email: "Email",
      password: "Senha",
      submit: "Criar conta",
      close: "Fechar",
    },
    about: {
      title: "Sobre",
      text: "NetWorking CodeFlow é uma plataforma para desenvolvedores se conectarem, trocarem ideias e colaborarem em tempo real.",
      close: "Fechar",
    },
    projects: {
      title: "Projetos",
      loading: "Carregando...",
      error: "Erro ao carregar projetos",
      close: "Fechar",
    },
    settingsModal: {
      themeLabel: "Tema:",
      themeLight: "Claro",
      themeDark: "Escuro",
      toggleTheme: "Alternar Tema",
      languageLabel: "Idioma:",
      profilePhoto: "Foto de perfil:",
      changePhoto: "Alterar foto",
      close: "Fechar",
    },
  },
  en: {
    welcome: "Welcome",
    settings: "Settings",
    navbar: {
      about: "About",
      login: "Login",
      register: "Register",
      projects: "Projects",
    },
    login: {
      title: "Login",
      email: "Email",
      password: "Password",
      submit: "Login",
      close: "Close",
    },
    register: {
      title: "Register",
      name: "Name",
      email: "Email",
      password: "Password",
      submit: "Create account",
      close: "Close",
    },
    about: {
      title: "About",
      text: "NetWorking CodeFlow is a platform for developers to connect, exchange ideas and collaborate in real time.",
      close: "Close",
    },
    projects: {
      title: "Projects",
      loading: "Loading...",
      error: "Error loading projects",
      close: "Close",
    },
    settingsModal: {
      themeLabel: "Theme:",
      themeLight: "Light",
      themeDark: "Dark",
      toggleTheme: "Toggle Theme",
      languageLabel: "Language:",
      profilePhoto: "Profile photo:",
      changePhoto: "Change photo",
      close: "Close",
    },
  },
};

const LanguageContext = createContext<{
  lang: Lang;
  t: typeof texts.pt;
  setLang: (l: Lang) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("lang") as Lang) || "pt";
    } catch {
      return "pt";
    }
  });

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: texts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

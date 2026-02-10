import { useState, useContext } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import AboutModal from "./AboutModal";
import SettingsModal from "./SettingsModal";
import ProjectsModal from "./ProjectsModal";
import ProfileAvatar from "./ProfileAvatar";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

import { useLanguage } from "../contexts/LanguageContext";
import { ProfileContext } from "../contexts/ProfileContext";

export default function Navbar() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [about, setAbout] = useState(false);
  const [settings, setSettings] = useState(false);
  const [projects, setProjects] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { photo } = useContext(ProfileContext);
  const avatarUrl = user?.avatar || photo || "https://via.placeholder.com/80";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Criar FormData para enviar arquivos
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      // Tentar enviar para o servidor (se endpoint existir)
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Arquivos enviados:", data);
          alert(`${files.length} arquivo(s) adicionado(s) com sucesso!`);
        })
        .catch((err) => {
          // Se não conseguir enviar, pelo menos mostra que foi selecionado
          console.log("Erro ao enviar arquivos:", err);
          console.log("Arquivos selecionados localmente:", files);
          alert(
            `${files.length} arquivo(s) selecionado(s)! (Aguardando processamento...)`
          );
        });
    }
    // Limpa o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = "";
  };

  return (
    <>
      <nav className="navbar">
        <h1>NetWorking CodeFlow</h1>

        <div className="procurar">
          <input
            type="search"
            id="search"
            className="inputprocurar"
            placeholder=" Procurar"
          ></input>
          <button type="button" id="buttonsearch" className="buttonprocurar">
            Procurar
          </button>
        </div>

        <div className="nav-buttons">
          <button className="sobre" onClick={() => setAbout(true)}>
            {t.navbar.about}
          </button>
          <button onClick={() => setLogin(true)}>{t.navbar.login}</button>

          <button onClick={() => setProjects(true)}>{t.navbar.projects}</button>

          {/* Botão de Upload de Arquivos */}
          <button
            className="upload-btn"
            onClick={() => document.getElementById("file-input")?.click()}
            title="Adicionar arquivo"
            aria-label="Adicionar arquivo"
          >
            +
          </button>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
            accept="*/*"
          />

          {/* Avatar de perfil (abre Configurações) */}
          <button
            className="profile-btn"
            onClick={() => setSettings(true)}
            title={t.settings}
            aria-label="Perfil"
          >
            <img src={avatarUrl} alt="Perfil" className="profile-img" />
          </button>
        </div>
      </nav>

      {login && (
        <LoginModal
          onClose={() => setLogin(false)}
          onOpenRegister={() => {
            setLogin(false);
            setRegister(true);
          }}
        />
      )}
      {register && (
        <RegisterModal
          onClose={() => setRegister(false)}
          onOpenLogin={() => {
            setRegister(false);
            setLogin(true);
          }}
        />
      )}
      {about && <AboutModal onClose={() => setAbout(false)} />}
      {settings && <SettingsModal onClose={() => setSettings(false)} />}
      {projects && <ProjectsModal onClose={() => setProjects(false)} />}
    </>
  );
}

import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelect from "./LanguageSelect";
import "./Modal.css";

type Props = {
  onClose: () => void;
};

export default function SettingsModal({ onClose }: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, updateAvatar, logout } = useAuth();
  const { t } = useLanguage();
  const [confirmLogout, setConfirmLogout] = useState(false);

  function handleConfirmLogout() {
    logout();
    setConfirmLogout(false);
    onClose();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t.settings}</h2>

        <div style={{ marginBottom: "12px" }}>
          <strong>{t.settingsModal.themeLabel}</strong>{" "}
          {theme === "light"
            ? t.settingsModal.themeLight
            : t.settingsModal.themeDark}
        </div>

        <button className="submit" onClick={toggleTheme}>
          {t.settingsModal.toggleTheme}
        </button>

        <div style={{ marginTop: 16 }}>
          <strong>{t.settingsModal.languageLabel}</strong>
          <div style={{ marginTop: 8 }}>
            <LanguageSelect />
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <strong>{t.settingsModal.profilePhoto}</strong>

          <div style={{ marginTop: 8 }} className="profile-row">
            <input
              id="avatar-upload"
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />

            <label htmlFor="avatar-upload" className="profile-photo-label">
              <img
                src={user?.avatar || "https://via.placeholder.com/80"}
                className="profile-image"
                alt="Avatar"
              />
              <span className="upload-overlay">📷 Mudar foto</span>
            </label>

            <label
              htmlFor="avatar-upload"
              className="text-sm cursor-pointer text-purple-600 change-photo-text"
            >
              {t.settingsModal.changePhoto}
            </label>
          </div>
          <button
            type="button"
            id="logout"
            className="logout"
            onClick={() => setConfirmLogout(true)}
            aria-label="Sair da conta"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
            </svg>
            Sair da conta
          </button>
        </div>

        <button className="close" onClick={onClose}>
          {t.settingsModal.close}
        </button>
      </div>

      {confirmLogout && (
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-modal">
            <h3>Deseja mesmo sair da conta?</h3>
            <div className="confirm-actions">
              <button className="submit danger" onClick={handleConfirmLogout}>
                Sim
              </button>
              <button className="close" onClick={() => setConfirmLogout(false)}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

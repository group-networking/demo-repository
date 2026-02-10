import { useEffect, useState } from "react";
import "./Modal.css";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  onClose: () => void;
  onOpenRegister?: () => void;
};

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginModal({ onClose, onOpenRegister }: Props) {
  const { t } = useLanguage();

  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  function showAlert(message: string, duration = 3000) {
    setAlertMsg(message);
    setTimeout(() => {
      setAlertMsg(null);
    }, duration);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert("Login realizado com sucesso!", 2500);
      } else {
        showAlert("Email ou senha inválidos", 3000);
      }

      console.log("Login response:", data);
    } catch (err) {
      showAlert("Erro ao conectar com o servidor", 3000);
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "SEU_CLIENT_ID_AQUI",
          callback: (response: any) => {
            console.log("Google token:", response.credential);
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          {
            theme: "outline",
            size: "large",
            width: "100%",
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{t.login.title}</h2>

        {alertMsg && (
          <div className="custom-alert">
            {alertMsg}
          </div>
        )}

        <input
          name="email"
          placeholder={t.login.email}
          required
        />

        <input
          name="password"
          type="password"
          placeholder={t.login.password}
          required
        />

        <div
          id="buttonDiv"
          style={{ minHeight: 40, marginBottom: 20 }}
        ></div>

        <button className="submit" type="submit">
          {t.login.submit}
        </button>

        <a
          href="#"
          className="modal-link"
          onClick={(e) => {
            e.preventDefault();
            onOpenRegister?.();
          }}
        >
          Não tem uma conta? Registre-se
        </a>

        <br />

        <a href="#">Esqueceu a senha</a>

        <button type="button" className="close" onClick={onClose}>
          {t.login.close}
        </button>
      </form>
    </div>
  );
}

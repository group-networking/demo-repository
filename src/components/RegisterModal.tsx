import "./Modal.css";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  onClose: () => void;
  onOpenLogin?: () => void;
};

export default function RegisterModal({ onClose, onOpenLogin }: Props) {
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form[0] as HTMLInputElement).value;
    const email = (form[1] as HTMLInputElement).value;
    const password = (form[2] as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Conta criada com sucesso!");
      onOpenLogin?.();
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  }

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{t.register.title}</h2>

        <input placeholder={t.register.name} required />
        <input placeholder={t.register.email} required />
        <input placeholder={t.register.password} type="password" required />

        <button className="submit" type="submit">
          {t.register.submit}
        </button>
        <a
          href="#"
          className="modal-link"
          onClick={(e) => {
            e.preventDefault();
            onOpenLogin?.();
          }}
        >
          Já tem uma conta? Entrar
        </a>
        <button type="button" className="close" onClick={onClose}>
          {t.register.close}
        </button>
      </form>
    </div>
  );
}

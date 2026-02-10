import "./Modal.css";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  onClose: () => void;
  onOpenLogin?: () => void;
};

export default function RegisterModal({ onClose, onOpenLogin }: Props) {
  const { t } = useLanguage();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

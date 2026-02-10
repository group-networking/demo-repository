import "./Modal.css";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  onClose: () => void;
};

export default function AboutModal({ onClose }: Props) {
  const { t } = useLanguage();

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t.about.title}</h2>
        <p>{t.about.text}</p>

        <button className="close" onClick={onClose}>
          {t.about.close}
        </button>
      </div>
    </div>
  );
}

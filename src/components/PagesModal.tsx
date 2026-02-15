import "./Modal.css";

type Props = {
  onClose: () => void;
};

export default function PagesModal({ onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Páginas</h2>

        <div className="pages-list">
          <p>Encontrar páginas</p>
        </div>

        <button onClick={onClose} className="close-btn">
          Fechar
        </button>
      </div>
    </div>
  );
}

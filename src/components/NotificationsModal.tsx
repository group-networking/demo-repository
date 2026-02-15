import "./Modal.css";

type Props = {
    onClose: () => void;
};

export default function NotificationsModal({ onClose }: Props) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Notificações</h2>

                <div className="notifications-list">
                    <h3>Nada aqui ainda!</h3>
                </div>

                <button onClick={onClose} className="close-btn">
                    Fechar
                </button>
            </div>
        </div>
    );
}


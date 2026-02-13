import React, { useState } from "react";
import "./PaymentModal.css";

interface PaymentModalProps {
  isOpen: boolean;
  planName: string;
  price: number;
  onClose: () => void;
}

export default function PaymentModal({
  isOpen,
  planName,
  price,
  onClose,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "pix-copy" | "pix-qrcode" | null
  >(null);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === "card") {
      if (
        cardData.number &&
        cardData.name &&
        cardData.expiry &&
        cardData.cvv
      ) {
        alert(`Pagamento de R$${price} aprovado via cartão!`);
        onClose();
      } else {
        alert("Por favor, preencha todos os campos do cartão");
      }
    } else if (paymentMethod === "pix-copy") {
      alert(`Chave Pix copiada! Transfira R$${price} para confirmar`);
      navigator.clipboard.writeText("12345678901234567890123456789");
    } else if (paymentMethod === "pix-qrcode") {
      alert(`Escaneie o QR Code para pagar R$${price}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div
        className="payment-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-modal-header">
          <h2>Pagamento - Plano {planName}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="payment-modal-body">
          <div className="price-info">
            <p>Valor a pagar:</p>
            <h3>R$ {price.toFixed(2).replace(".", ",")}</h3>
          </div>

          <div className="payment-methods">
            {/* Cartão */}
            <div className="method-section">
              <label className="method-selector">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value as "card")}
                />
                <span className="method-title">💳 Cartão de Crédito</span>
              </label>

              {paymentMethod === "card" && (
                <div className="card-form">
                  <input
                    type="text"
                    name="number"
                    placeholder="Número do cartão (16 dígitos)"
                    maxLength={16}
                    value={cardData.number}
                    onChange={handleCardChange}
                    className="card-input"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome do titular"
                    value={cardData.name}
                    onChange={handleCardChange}
                    className="card-input"
                  />
                  <div className="card-row">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      className="card-input small"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      className="card-input small"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Pix Copia e Cola */}
            <div className="method-section">
              <label className="method-selector">
                <input
                  type="radio"
                  name="payment"
                  value="pix-copy"
                  checked={paymentMethod === "pix-copy"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as "pix-copy")
                  }
                />
                <span className="method-title">📋 Pix Copia e Cola</span>
              </label>

              {paymentMethod === "pix-copy" && (
                <div className="pix-copy-section">
                  <p className="pix-instruction">
                    Copie a chave Pix abaixo e cole no seu aplicativo bancário
                  </p>
                  <div className="pix-key-container">
                    <code>12345678901234567890123456789</code>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "12345678901234567890123456789"
                        );
                        alert("Chave Pix copiada!");
                      }}
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code */}
            <div className="method-section">
              <label className="method-selector">
                <input
                  type="radio"
                  name="payment"
                  value="pix-qrcode"
                  checked={paymentMethod === "pix-qrcode"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as "pix-qrcode")
                  }
                />
                <span className="method-title">📱 Pix QR Code</span>
              </label>

              {paymentMethod === "pix-qrcode" && (
                <div className="qrcode-section">
                  <p className="qrcode-instruction">
                    Escaneie o QR Code abaixo com seu celular
                  </p>
                  <div className="qrcode-placeholder">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.brcode01051.0.063047F1E8D1A4E2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z71234567890"
                      alt="QR Code Pix"
                      className="qrcode-image"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="payment-modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-pay"
            disabled={!paymentMethod}
            onClick={handlePaymentSubmit}
          >
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
}

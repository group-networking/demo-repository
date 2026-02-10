import React from "react";
import "./FreeplanModal.css";

interface FreePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreePlanModal({ isOpen, onClose }: FreePlanModalProps) {
  if (!isOpen) return null;

  const advantages = [
    {
      icon: "👥",
      title: "Seguidores Básicos",
      description: "Conecte-se com a comunidade e construa sua rede",
    },
    {
      icon: "🔒",
      title: "Suporte de Segurança Padrão",
      description: "Proteção básica para sua conta e dados pessoais",
    },
    {
      icon: "💬",
      title: "Conversas em Tempo Real",
      description: "Chat básico com outros usuários",
    },
    {
      icon: "🔔",
      title: "Notificações",
      description: "Receba atualizações importantes",
    },
    {
      icon: "📱",
      title: "Acesso Móvel",
      description: "Use a plataforma em qualquer dispositivo",
    },
    {
      icon: "🆓",
      title: "Sempre Grátis",
      description: "Sem cobranças ocultas ou surpresas",
    },
  ];

  return (
    <div className="freeplan-modal-overlay" onClick={onClose}>
      <div
        className="freeplan-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="freeplan-modal-header">
          <h2>🎉 Plano Grátis</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="freeplan-modal-body">
          <div className="plan-description">
            <p className="main-text">
              Comece sua jornada de forma gratuita e explore todas as
              funcionalidades básicas
            </p>
            <p className="price">R$ 0,00 / mês</p>
          </div>

          <div className="advantages-grid">
            {advantages.map((advantage, index) => (
              <div key={index} className="advantage-card">
                <div className="advantage-icon">{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="upgrade-info">
            <p>
              Quer mais recursos? <strong>Upgrade para Premium</strong> e
              desbloqueie funcionalidades avançadas!
            </p>
          </div>
        </div>

        <div className="freeplan-modal-footer">
          <button className="btn-close" onClick={onClose}>
            Fechar
          </button>
          <button className="btn-success" onClick={onClose}>
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
}

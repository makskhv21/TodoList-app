import React from 'react';

function QuoteModal({ quote, onClose, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Цитата дня</h2>
        <p>{quote || 'Цитата не доступна'}</p>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
}

export default QuoteModal;


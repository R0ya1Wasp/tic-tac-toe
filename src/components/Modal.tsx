import React from 'react';
import './Modal.css';

interface ModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;

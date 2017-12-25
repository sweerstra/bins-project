import React from 'react';
import './Modal.css';

const Modal = ({ isOpen = false }) => {
  const modalOpenClass = isOpen ? '' : 'closed';

  return (
    <div>
      <div className={`modal ${modalOpenClass}`}>
        <div className="modal-container">

        </div>
      </div>

      <div className="modal-overlay">
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

const Modal = ({ image, alt, isOpen, onClose }) => (
  <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <img src={image} alt={alt} style={{ width: '100%', marginBottom: '20px' }} />
      <h2 className="text-xl font-bold mb-2">Image Details</h2>
      <p>{alt}</p>
    </div>
  </div>
);

export default Modal;

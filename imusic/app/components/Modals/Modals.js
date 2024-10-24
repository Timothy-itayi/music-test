import React from 'react';
import Player from '../player';

const Modal = ({ image, alt, isOpen, onClose, soundKey }) => (
  <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <img src={image} alt={alt} style={{ width: '100%', marginBottom: '20px' }} />

      <Player soundKey={soundKey} />
      <p>{alt}</p>
    </div>
  </div>
);

export default Modal;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Player from '../player';

const Modal = ({ image, alt, soundKey, isOpen, onClose, onPrev, onNext, showPrev, showNext }) => {
  
  // Close modal on Escape key press
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={image} alt={alt} style={{ width: '100%', marginBottom: '20px' }} />
        <h2 className="text-xl font-bold mb-2">{alt}</h2>

        {/* Player component with dynamic soundKey */}
        <Player soundKey={soundKey} />

        <div className="flex justify-between mt-4">
          {showPrev && (
            <button onClick={onPrev} className="hover:scale-110 transform transition">
              Previous
            </button>
          )}
          {showNext && (
            <button onClick={onNext} className="hover:scale-110 transform transition">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};




export default Modal;

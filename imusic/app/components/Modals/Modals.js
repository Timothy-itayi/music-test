import React, { useEffect, useState } from 'react';
import MusicPlayer from '../Modals/Audio-Player/Music-Player';

const Modal = ({ image, alt, soundSrc, isOpen, onClose, onPrev, onNext, showPrev, showNext }) => {
  const [animating, setAnimating] = useState(false);

  // Close modal on Escape key press
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const closeModal = () => {
    setAnimating(true);
    setTimeout(() => {
      onClose();
      setAnimating(false);
    }, 300); // Match this timeout with the duration of your exit animation
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
    <div
      className={`modal ${isOpen ? 'modal-open' : ''} ${animating ? 'animate-fade-out' : 'animate-fade-down'}`}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div>
        <span className="close" onClick={closeModal}>&times;</span>
        <img src={image} alt={alt} style={{ width: '100%', marginBottom: '20px' }} />
        <h2 className="text-xl font-bold mb-2">{alt}</h2>
        <MusicPlayer soundSrc={soundSrc} />
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

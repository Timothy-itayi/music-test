import React, { useState, useRef, useEffect } from 'react';
import './CardStack.scss';
import Image from 'next/image';
import gsap from 'gsap';
import MusicPlayer from '../Modals/Audio-Player/Music-Player';

const CardStack = ({ cards }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [animating, setAnimating] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const handleCardClick = (card, index) => {
    setActiveCard({
      ...card,
      index,
      showPrev: index > 0,
      showNext: index < cards.length - 1
    });
  };

  const closeModal = () => {
    setAnimating(true);
    const timeline = gsap.timeline({
      onComplete: () => {
        setActiveCard(null);
        setAnimating(false);
      }
    });

    timeline
      .to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      }, "-=0.3");
  };

  const handlePrev = () => {
    if (activeCard.index > 0) {
      handleCardClick(cards[activeCard.index - 1], activeCard.index - 1);
    }
  };

  const handleNext = () => {
    if (activeCard.index < cards.length - 1) {
      handleCardClick(cards[activeCard.index + 1], activeCard.index + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowLeft' && activeCard?.showPrev) {
        handlePrev();
      } else if (event.key === 'ArrowRight' && activeCard?.showNext) {
        handleNext();
      }
    };

    if (activeCard) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      
      gsap.from(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5
      });
      
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      });
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCard]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 card-stack-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleCardClick(card, index)}
          >
            <div className="image">
              <img src={card.src} alt={card.alt} className="main-image" />
            </div>
            <div className="details">
              <div className="center">
                <Image
                  src='/vinyl.svg'
                  alt='vinyl-svg'
                  width={200}
                  height={200}
                  className='template-image'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeCard && (
        <>
          <div
            ref={overlayRef}
            className="fixed inset-0  z-40"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-[#F4F4F3] rounded-xl max-w-lg w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 p-2 rounded-full bg-[#40b462] hover:bg-[#266108] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img
                  src={activeCard.src}
                  alt={activeCard.alt}
                  className="w-full h-100 object-cover "
                />
              </div>
<div className='text-center justify-center bg-[#40b462] rounded-lg m-10 px-4 py-5 text-xl text-white hover:bg-[#266108] transition-colors'>

              <MusicPlayer soundSrc={activeCard.soundSrc} 
           />
</div>
           

              <div className="p-4 flex justify-between custom-font">
                <button
                  onClick={handlePrev}
                  disabled={!activeCard.showPrev}
                  className={`px-4 py-2 rounded-lg ${
                    activeCard.showPrev
                      ? 'bg-[#7386D5] hover:bg-[#2a4bcc]'
                      : 'bg-[#7386D5] text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!activeCard.showNext}
                  className={`px-4 py-2 rounded-lg ${
                    activeCard.showNext
                      ? 'bg-[#7386D5] hover:bg-[#2a4bcc]'
                      : 'bg-[#7386D5] text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardStack;
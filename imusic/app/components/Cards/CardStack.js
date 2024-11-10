import React, { useRef, useState, useEffect } from 'react';
import ProjectCard from '../Cards/ProjectCard';

const CardStack = ({ cards, onCardClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (isTransitioning) {
      // Short timeout to allow for hiding animation
      const timer = setTimeout(() => setIsTransitioning(false), 5);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleCardClick = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      onCardClick(index);
    }
  };

  const smoothScroll = (direction) => {
    if (!isTransitioning) {
      const newIndex = direction === 'left'
        ? Math.max(0, activeIndex - 1)
        : Math.min(cards.length - 1, activeIndex + 1);
      
      setIsTransitioning(true);
      setActiveIndex(newIndex);
      
      if (scrollerRef.current) {
        const targetCard = scrollerRef.current.children[newIndex];
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }
  };

  const getAnimationClass = (index) => {
    if (isTransitioning) return 'card-transitioning';
    return index === activeIndex ? `animate${index + 1}-active` : `animate${index + 1}-inactive`;
  };

  return (
    <div className="fixed h-screen w-full top-0 right-0 bottom-0 left-0 z-2 flex items-center justify-center perspective-1000">
      <main className="w-[800px] h-[600px] preserve-3d">
        <div
          ref={scrollerRef}
          className="w-full h-full overflow-hidden whitespace-nowrap flex snap-x snap-mandatory scroller"
        >
          {cards.map((_, index) => (
            <div
              key={index}
              className="flex-none w-full h-full snap-start scroll-item"
              data-index={index}
            />
          ))}
        </div>

        <div className="card-stack absolute inset-0 preserve-3d">
          {cards.map((card, index) => (
            <div
              key={`${index}-${activeIndex}`}
              className={`card absolute inset-0 m-auto w-[300px] h-[400px] rounded-2xl flex items-center justify-center preserve-3d overflow-hidden shadow-lg transform-gpu cursor-pointer transition-transform duration-500 ${getAnimationClass(index)}`}
              data-position={index - activeIndex}
              onClick={() => handleCardClick(index)}
              style={{
                zIndex: activeIndex === index ? 10 : 1,
              }}
            >
              <ProjectCard
                image={card.src}
                alt={card.alt}
                soundSrc={card.soundSrc}
                className="w-full h-full card"
              />
            </div>
          ))}
        </div>
      </main>
      <button
        onClick={() => smoothScroll('left')}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        Left
      </button>
      <button
        onClick={() => smoothScroll('right')}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        Right
      </button>
    </div>
  );
};

export default CardStack;
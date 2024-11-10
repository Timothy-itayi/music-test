import React, { useState, useEffect, useCallback } from 'react';
import ProjectCard from '../Cards/ProjectCard';

const MemoizedProjectCard = React.memo(ProjectCard);

const CardStack = ({ cards, onCardClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 0); // Adjust based on CSS transition
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleCardSelect = useCallback((index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      onCardClick(index);
      console.log(`Card selected: ${index}`, cards[index]); // Log the selected card
    }
  }, [isTransitioning, onCardClick, cards]);

  const navigateCards = (direction) => {
    if (!isTransitioning) {
      const newIndex =
        direction === 'previous'
          ? Math.max(0, activeIndex - 1)
          : Math.min(cards.length - 1, activeIndex + 1);

      setIsTransitioning(true);
      setActiveIndex(newIndex);
      console.log(`Navigated to card: ${newIndex}`, cards[newIndex]); // Log the card being navigated to
    }
  };

  return (
    <div className="fixed h-screen w-full top-0 right-0 bottom-0 left-0 z-2 flex items-center justify-center perspective-1000">
      <main className="w-[800px] h-[600px] preserve-3d">
        <div className="w-full h-full overflow-hidden whitespace-nowrap flex snap-x snap-mandatory scroller">
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
              key={index} // Use stable index as key
              className={`card absolute inset-0 m-auto w-[300px] h-[400px] rounded-2xl flex items-center justify-center preserve-3d overflow-hidden shadow-lg transform-gpu cursor-pointer`}
              data-position={index - activeIndex}
              onClick={() => handleCardSelect(index)}
              style={{
                zIndex: activeIndex === index ? 10 : 1,
              }}
            >
              <MemoizedProjectCard
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
        onClick={() => navigateCards('previous')}
        className="absolute left-5 top-1/2 hover:scale-110 transform transition bg-gray-700 text-white p-2 rounded-md"
      >
        Previous
      </button>
      <button
        onClick={() => navigateCards('next')}
        className="absolute right-5 top-1/2 hover:scale-110 transform transition bg-gray-700 text-white p-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default CardStack;

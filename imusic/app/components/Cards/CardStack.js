import React, { useEffect, useRef } from 'react';
import ProjectCard from '../Cards/ProjectCard';

const CardStack = ({ cards, onCardClick }) => {
  const mainRef = useRef(null);
  const scrollerRef = useRef(null);
  const cardStackRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const scroller = scrollerRef.current;
    
    if (!main || !scroller) return;

    const resizeObserver = new ResizeObserver(() => {
      updateActiveIndex();
    });

const updateActiveIndex = () => {
  if (!mainRef.current || !scrollerRef.current || !cardStackRef.current) return;

  const scrollLeft = scrollerRef.current.scrollLeft;
  const cardWidth = mainRef.current.getBoundingClientRect().width;
  const activeIndex = Math.round(scrollLeft / cardWidth);

  mainRef.current.dataset.activeIndex = activeIndex;
  cardStackRef.current.dataset.activeIndex = activeIndex;

  console.log('Scroll Left:', scrollLeft);
  console.log('Active Index:', activeIndex);

  const cards = cardStackRef.current.querySelectorAll('.card');
  
  // Adjust data-position for each card relative to the activeIndex
  cards.forEach((card, index) => {
    const position = index - activeIndex;
    card.dataset.position = position;

    // Log each card’s position for debugging
    console.log(`Card ${index} - Position: ${position}`);
  });
};

    const handleScroll = () => {
      requestAnimationFrame(updateActiveIndex);
    };

    const handleScrollSnapChange = (event) => {
      const activeIndex = Math.round(event.target.scrollLeft / main.getBoundingClientRect().width);
      main.dataset.activeIndex = activeIndex;
      if (cardStackRef.current) {
        cardStackRef.current.dataset.activeIndex = activeIndex;
      }
      console.log('Scroll Snap Change Active Index:', activeIndex);
    };

    scroller.addEventListener('scroll', handleScroll);
    scroller.addEventListener('scrollsnapchange', handleScrollSnapChange);
    resizeObserver.observe(main);

    updateActiveIndex();

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      scroller.removeEventListener('scrollsnapchange', handleScrollSnapChange);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -mainRef.current.clientWidth, behavior: 'smooth' });
      console.log('Scrolling left');
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: mainRef.current.clientWidth, behavior: 'smooth' });
      console.log('Scrolling right');
    }
  };

  return (
    <div className="fixed h-screen w-full top-0 right-0 bottom-0 left-0 z-2 flex items-center justify-center perspective-1000">
      <main 
        ref={mainRef}
        className="w-[800px] h-[600px] preserve-3d"
        data-active-index="0"
      >
        <div 
          ref={scrollerRef}
          className="w-full h-full overflow-auto whitespace-nowrap flex snap-x snap-mandatory scroller"
        >
          {cards.map((_, index) => (
            <div 
              key={index} 
              className="flex-none w-full h-full snap-start scroll-item"
              data-index={index}
            />
          ))}
        </div>
        
        <div 
          ref={cardStackRef}
          className="card-stack absolute inset-0 preserve-3d pointer-events-none"
          data-active-index="0"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="card absolute inset-0 m-auto w-[300px] h-[400px] rounded-2xl flex items-center justify-center preserve-3d overflow-hidden shadow-lg transform-gpu cursor-pointer transition-transform duration-500"
              onClick={() => onCardClick(index)}
              data-position="0"
            >
              <ProjectCard
                image={card.src}
                alt={card.alt}
                soundSrc={card.soundSrc}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        Left
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        Right
      </button>
    </div>
  );
};

export default CardStack;

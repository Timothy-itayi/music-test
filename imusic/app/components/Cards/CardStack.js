import React, { useEffect, useRef } from 'react';
import ProjectCard from '../Cards/ProjectCard';
import * as THREE from 'three';  // Importing Three.js

const CardStack = ({ cards, onCardClick }) => {


  return (
    <div className="project-container" >
      <div className="project-stack">
        {cards.map((card, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => onCardClick(index)}
            style={{
              position: 'absolute',
              width: '300px',
              height: '400px',
              transition: 'transform 0.3s ease-in-out',
              top: `${index * 20}px`, 
              left: `${index * 20}px`, 
              zIndex: cards.length - index,
            }}
          >
            <ProjectCard
              image={card.src}
              alt={card.alt}
              soundSrc={card.soundSrc}
            />
     
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;

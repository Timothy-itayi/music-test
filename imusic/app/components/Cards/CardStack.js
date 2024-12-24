import React from 'react';
import './CardStack.scss'; // Import the SCSS file

const CardStack = ({ cards, templateSrc }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 card-stack-container">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="image">
            <img src={templateSrc} alt="Template" className="template-image" />
            <img src={card.src} alt={card.alt} className="main-image" />
          </div>
          <div className="details">
            <div className="center">
              <h1>
                {card.alt} <span>Additional Info</span>
              </h1>
              <p>Description text for the card can go here.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStack;

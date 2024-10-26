import React from 'react';


const ProjectCard = ({ image, alt, soundSrc, onClick }) => (
  <div className="project-card " onClick={onClick}>
    <img src={image} alt={alt} />

  </div>
);

export default ProjectCard;

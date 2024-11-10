import React from 'react';
import MusicPlayer from '../Modals/Audio-Player/Music-Player';

const ProjectCard = ({ image, alt, soundSrc, onClick,  }) => (
  <div className="project-card relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4 overflow-hidden transition-transform duration-300 transform hover:scale-105" onClick={onClick}>
    <h2 className="text-xl font-bold mb-2">{alt}</h2>
    <MusicPlayer soundSrc={soundSrc} />

    {/* Image container */}
    <div className="project-card ">
      <img src={image} alt={alt} className="card" />
    </div>


 
  </div>
);

export default ProjectCard;

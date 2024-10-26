'use client'
import { useState } from 'react';
import Head from 'next/head';
import ProjectCard from '../app/components/Cards/ProjectCard';
import images from './data/images-data';
import Modal from '../app/components/Modals/Modals';
import Navbar from './components/Nav/NavBar';

export default function Home ()  {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Function to go to the previous image
  const handlePrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Function to go to the next image
  const handleNext = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Get the selected image based on the index
  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div>
      <Head>
        <title>Project Showcase</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
      </Head>
      <Navbar/>
      <div className="project-container">
        <div className="project-stack">
          {images.map((img, index) => (
            <ProjectCard 
              key={index}
              image={img.src}
              alt={img.alt}
              soundSrc={img.soundSrc}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-4">
        <button className="px-4 py-2 bg-black rounded-full text-white text-sm">Genres</button>
        <button className="px-4 py-2 bg-black rounded-full text-white text-sm">Albums</button>
        <button className="px-4 py-2 bg-black rounded-full text-white text-sm">Playlists</button>
        <button className="px-4 py-2 bg-black rounded-full text-white text-sm">Radio</button>
        <button className="px-4 py-2 bg-black rounded-full text-white text-sm">Cafe</button>
      </div>

      {selectedImage && (
        <Modal
          image={selectedImage.src}
          alt={selectedImage.alt}
          soundSrc={selectedImage.soundSrc}
          isOpen={selectedImage !== null}
          onClose={() => setSelectedImageIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          showPrev={selectedImageIndex > 0}
          showNext={selectedImageIndex < images.length - 1}
        />
      )}
    </div>
  );
};

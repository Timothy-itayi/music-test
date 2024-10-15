'use client'
import { useState } from 'react';
import Head from 'next/head';
import ProjectCard from '../app/components/Cards/ProjectCard';
import Modal from '../app/components/Modals/Modals';
import Navbar from './components/Nav/NavBar';

export default function Home ()  {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    { src: "/assets/icon00.png", alt: "Orchids project image" },
    { src: "/assets/icon01.png", alt: "Sports image with players celebrating" },
    { src: "/assets/icon02.png", alt: "Blurred nature image with green and yellow tones" },
    { src: "/assets/icon03.png", alt: "Close-up of purple crystal formation" },
    { src: "/assets/icon04.png", alt: "Close-up of a golf ball" },
    { src: "/assets/icon05.png", alt: "Scenic sky with clouds" },
    { src: "/assets/icon06.png", alt: "Abstract blue circular shape" },
  
  ];

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
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-4 ">
        <button className="px-4 py-2 bg-black rounded-full text-white  text-sm">Genres</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  text-sm">Albums</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  text-sm">Playlists</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  text-sm">Radio</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  text-sm">Cafe</button>
     
      </div>
      <Modal
        image={selectedImage?.src}
        alt={selectedImage?.alt}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};



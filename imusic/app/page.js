'use client'
import { useState } from 'react';
import Head from 'next/head';
import ProjectCard from '../app/components/Cards/ProjectCard';
import Modal from '../app/components/Modals/Modals';
import Navbar from './components/Nav/NavBar';

export default function Home ()  {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    { src: "https://replicate.delivery/yhqm/8T1ROzeeY3iPLUoy1GkIszFHWmfiARozWq1kbqHENkMQdQNnA/out-0.png", alt: "Orchids project image" },
    { src: "https://replicate.delivery/yhqm/WIfNHakzQTyTNCIsKGuKgZfRRY3szZhx1AKriBFCHVvoOomTA/out-0.png", alt: "Sports image with players celebrating" },
    { src: "https://replicate.delivery/yhqm/vTMDGdYc1aZkIVGL85wA6YRIjVw8knTI0meqHTpDtP5UHUzJA/out-0.png", alt: "Blurred nature image with green and yellow tones" },
    { src: "https://replicate.delivery/yhqm/0YfWSfDVclrKOEhrVhsGuudiuh1rugiVV2RQ7AyWCmHoOomTA/out-0.png", alt: "Close-up of purple crystal formation" },
    { src: "https://replicate.delivery/yhqm/ZwDwhfLkbVxheUScLNrhSuiBlwtuMG7LYCTfmpUo3BGRdQNnA/out-0.png", alt: "Close-up of a golf ball" },
    { src: "https://replicate.delivery/yhqm/ffz6N6T4CctKDkfbpB2BlKOakk8bSe4MgAQsWeqWVIgD1B1cC/out-0.png", alt: "Scenic sky with clouds" },
    { src: "https://replicate.delivery/yhqm/bglgwiQeaiTEa6OiYZfaOX1qM3fjhtflIWdU7UUEI4wk6gaOB/out-0.png", alt: "Abstract blue circular shape" },
    { src: "https://replicate.delivery/yhqm/BaRQiGnsx46HPBSe9nfGfD38rLA8qfJPfBcDQ1DOvDOK1B1cC/out-0.png", alt: "Abstract grayscale pattern" },
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
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2">
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">ALL 144</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">GRAPHIC IDENTITY 43</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">SITE DESIGN 25</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">AI 61</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">VIDEO 14</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">3D 17</button>
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



'use client'
import { useState } from 'react';
import Head from 'next/head';
import CardStack from './components/Cards/CardStack';
import images from './data/images-data';
import Modals from './components/Modals/Modals';
import sounds from '../app/data/sounds'
import Navbar from './components/Nav/NavBar';

export default function Home ()  {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (card) => {
    setSelectedImage(card); // Set the selected card's data to show in the modal
  };

  return (
    <div>
      <Head>
        <title>Project Showcase</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
      </Head>
      <Navbar/>
      <CardStack cards={images} sounds={sounds} onImageSelect={handleImageSelect} />
      <div className="absolute right-4 custom-font ">
        <button className="px-4  bg-black rounded-full text-white text-sm">Genres</button>
        <button className="px-4  bg-black rounded-full text-white text-sm">Albums</button>
        <button className="px-4  bg-black rounded-full text-white text-sm">Playlists</button>
        <button className="px-4  bg-black rounded-full text-white text-sm">Radio</button>
        <button className="px-4  bg-black rounded-full text-white text-sm">Cafe</button>
      </div>

      {selectedImage && (
      <Modals
      image={selectedImage.src}
      alt={selectedImage.alt}
      soundSrc={selectedImage.soundSrc}
      isOpen={selectedImage !== null}
      onClose={() => setSelectedImage(null)}
      // You can pass the functions for prev/next here
      onPrev={() => console.log("Previous image")}
      onNext={() => console.log("Next image")}
      showPrev={selectedImage !== images[0]} // Disable if it's the first image
      showNext={selectedImage !== images[images.length - 1]} // Disable if it's the last image
    />
      )}
    </div>
  );
};

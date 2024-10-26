// components/Player/MusicPlayer.js

import { useState, useEffect } from 'react';

const MusicPlayer = ({ soundSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = typeof Audio !== "undefined" ? new Audio(soundSrc) : null;

  useEffect(() => {
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
    return () => audio && audio.pause();
  }, [isPlaying, soundSrc])
  console.log(soundSrc)
  ;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

  };

  return (
    <button onClick={togglePlay} className="music-player-button">
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default MusicPlayer;

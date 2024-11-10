import { useCallback, useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ soundSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Using useRef to store the audio element

  useEffect(() => {
    // Create a new audio element only if soundSrc changes
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the previous audio if any
      audioRef.current = new Audio(soundSrc); // Update audio element
    } else {
      audioRef.current = new Audio(soundSrc);
    }

    // Cleanup: Pause the audio when the component unmounts or before switching tracks
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [soundSrc]); // Runs when soundSrc changes

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
      console.log("Current Song", soundSrc);
    }
  };

  return (
    <button onClick={togglePlay} className="music-player-button">
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default MusicPlayer;

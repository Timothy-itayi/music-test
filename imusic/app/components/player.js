'use client';
import React, { useRef, useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import sounds from '../data/sounds'; // Import sounds data

const Player = ({ selectedImage }) => {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null); // State for error handling

  const audioRef = useRef(null);
  
  // Check if selectedImage is defined and has a soundKey
  const soundKey = selectedImage && selectedImage.soundKey ? selectedImage.soundKey : null;

  // Find the sound file based on soundKey
  const selectedSound = soundKey ? sounds.find(sound => sound.key === soundKey) : null;
  const soundFile = selectedSound ? `/audio/${selectedSound.waveType}` : null;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause();
        setPlay(false);
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Error playing audio:", err);
          setError("Failed to play audio."); // Set error state
        });
        setPlay(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setCurrentTime(currentTime);
      setProgress(normalize(currentTime, duration));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setCurrentTime(0); // Reset current time to 0
    setProgress(0); // Reset progress to 0
    setPlay(false); // Stop playback
  };

  const handleError = (e) => {
    console.error("Audio Error:", e);
    setError("Audio could not be played.");
  };

  const normalize = (value, max) => {
    if (max === 0) return 0;
    return (value / max) * 100;
  };

  // Define the formatTime function here
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && soundFile) {
      audioRef.current.src = soundFile; // Set the source based on the soundFile
      audioRef.current.load(); // Load the new audio source
      // Reset state when changing sound
      setCurrentTime(0);
      setDuration(0);
      setProgress(0);
      setPlay(false);
    }
  }, [soundFile]); // Depend on soundFile

  useEffect(() => {
    setProgress(normalize(currentTime, duration));
  }, [currentTime, duration]);

  return (
    <div className="items-center justify-center mb-3 bg-black p-3">
      <div className="flex-col text-center">
        {error && <div className="text-red-500">{error}</div>} {/* Show error message */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-white">{formatTime(currentTime)}</span>
          <div className="flex grow">
            <LinearProgress variant="determinate" sx={{ width: '100%' }} value={progress} />
          </div>
          <span className="text-white">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center mr-4 gap-4 rounded-full">
          <div className="filter invert">
            <button onClick={toggleAudio} type="button">
              {!play ? (
                <img src="/play-solid.svg" className="h-12 w-12" aria-hidden="true" />
              ) : (
                <img src="/pause-solid.svg" className="h-12 w-12" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <audio ref={audioRef} /> {/* Empty initially, src is set in useEffect */}
      </div>
    </div>
  );
};

export default Player;

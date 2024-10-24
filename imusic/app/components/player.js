import React, { useState, useEffect, useRef } from 'react';
import sounds from '../data/sounds';

const Player = ({ soundKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ min: "00", sec: "00" });
  const [currTime, setCurrTime] = useState({ min: "00", sec: "00" });
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); // Create a ref for the audio element
  
  const soundFile = sounds[soundKey]; // Retrieve the correct sound from sounds.js

  // Play or pause audio
  const playingButton = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Update current time when the audio is playing
  useEffect(() => {
    const updateCurrentTime = () => {
      const current = audioRef.current.currentTime;
      const min = Math.floor(current / 60);
      const sec = Math.floor(current % 60);
      setCurrTime({ min: min < 10 ? `0${min}` : min, sec: sec < 10 ? `0${sec}` : sec });
      setSeconds(current);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateCurrentTime);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, []);

  // Set the duration when the audio is loaded
  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current.duration;
    setDuration(audioDuration);

    const min = Math.floor(audioDuration / 60);
    const sec = Math.floor(audioDuration % 60);
    setTime({ min: min < 10 ? `0${min}` : min, sec: sec < 10 ? `0${sec}` : sec });
  };

  // Handle time change via the input range (seek functionality)
  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setSeconds(newTime);
  };

  return (
    <div className="text-center">
      <h2>Playing Now</h2>
    
      <div>
        <h3 className="text-2xl font-bold">{soundKey}</h3>
      </div>
      <div className="flex justify-between py-4">
        <p>{currTime.min}:{currTime.sec}</p>
        <p>{time.min}:{time.sec}</p>
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        value={seconds}
        className="w-full my-4"
        onChange={handleTimeChange}
      />
      <div className="flex justify-center space-x-4">
        <button className="hover:scale-110 transform transition">Prev</button>
        <button className="hover:scale-110 transform transition" onClick={playingButton}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="hover:scale-110 transform transition">Next</button>
      </div>
      <audio
        ref={audioRef}
        src={soundFile}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default Player;

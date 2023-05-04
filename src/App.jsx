import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlay, FaPause, FaRedo  } from 'react-icons/fa';

import './App.css';

const App = () => {
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setDuration(25 * 60);
    setTimeLeft(25 * 60);
  };

  const handleSettings = () => {
    const newDuration = prompt('Enter duration in minutes:', duration / 60);
    if (newDuration) {
      setDuration(parseInt(newDuration, 10) * 60);
      setTimeLeft(parseInt(newDuration, 10) * 60);
      setIsRunning(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="app-container">
    <div className="timer-container">
      <div className="timer">
        <CircularProgressbar
          value={(timeLeft / duration) * 100}
          text={formatTime(timeLeft)}
          styles={buildStyles({
            textSize: '35px',
            pathColor: '#00c6d7',
            textColor: '#444',
            trailColor: '#eee',
          })}
        />
      </div>
      </div>
      <div className="timer-controls">
        {isRunning ? (
          <button className="timer-button" onClick={handlePause}>
            <FaPause className="timer-button-icon" />
          </button>
        ) : (
          <button className="timer-button" onClick={handleStart}>
            <FaPlay className="timer-button-icon" />
          </button>
        )}
        <button className="timer-button" onClick={handleReset}>
          <FaRedo  className="timer-button-icon" />
        </button>
        <button className="timer-button" onClick={handleSettings}>
          <span className="timer-button-icon">⚙️</span>
        </button>
      </div>
    </div>
  );
};

export default App;

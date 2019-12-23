import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/state';
import { GameStatus } from '../../../core/game/state/types';

const Timer = () => {
  const [isPaused, setIsPaused] = useState(false);
  const status = useSelector((state: RootState) => state.game.status);
  const interval = useRef(setInterval(() => {}, 100));
  const [minutes, setMinutes] = useState(5);
  const [currentMinutes, setCurrentMinutes] = useState(5);
  const [seconds, setSeconds] = useState(30);
  const [currentSeconds, setCurrentSeconds] = useState(1);
  useEffect(() => {
    if (status === GameStatus.Paused) {
      clearInterval(interval.current);
      setIsPaused(true);
      setMinutes(currentMinutes);
      setSeconds(currentSeconds);
    } else {
      setIsPaused(false);
    }
  }, [status]);

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        if (seconds > -1) {
          setSeconds(seconds => {
            const currentSeconds = seconds - 1;
            if (currentSeconds === -1) {
              setMinutes(minutes => {
                const currentMinutes = minutes - 1;
                if (currentMinutes === -1) {
                  window.alert('Raise time');
                  setCurrentMinutes(5);
                  setCurrentSeconds(30);
                  return 5;
                } else {
                  setCurrentMinutes(minutes - 1);
                  return minutes - 1;
                }
              });
              setCurrentSeconds(59);
              return 59;
            } else {
              setCurrentSeconds(currentSeconds);
              return currentSeconds;
            }
          });
        }
      }, 1000);
    }
  }, [isPaused]);

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">
          Time Remaining: {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>
    </div>
  );
};

export default Timer;

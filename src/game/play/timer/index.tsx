import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/state';
import { GameStatus } from '../../../core/game/state/types';
import isPlayerAdmin from '../../../core/game/player-service';
import { Raise } from '../../../core/socket/state/actions';

const Timer = () => {
  const gameId = useSelector((state: RootState) => state.game.data.gameId);
  const dispatchRaise = useDispatch<Dispatch<Raise>>();
  const [isPaused, setIsPaused] = useState(false);
  const status = useSelector((state: RootState) => state.game.status);
  const interval = useRef(setInterval(() => {}, 100));
  const [minutes, setMinutes] = useState(5);
  const [currentMinutes, setCurrentMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  useEffect(() => {
    if (status === GameStatus.Paused) {
      clearInterval(interval.current);
      setSeconds(currentSeconds);
      setMinutes(currentMinutes);
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, [status, currentMinutes, currentSeconds]);

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        setSeconds(seconds => {
          const currentSeconds = seconds - 1;
          if (currentSeconds === -1) {
            setMinutes(minutes => {
              const currentMinutes = minutes - 0.5;
              if (currentMinutes === -1) {
                setCurrentMinutes(5);
                setCurrentSeconds(0);
                if (isPlayerAdmin()) {
                  dispatchRaise(new Raise(gameId));
                }
                return 5;
              } else {
                setCurrentMinutes(currentMinutes);
                return currentMinutes;
              }
            });

            setCurrentSeconds(59);
            return 59;
          } else {
            setCurrentSeconds(currentSeconds);
            return currentSeconds;
          }
        });
      }, 1000);
      return function cleanup() {
        clearInterval(interval.current);
      };
    }
  }, [isPaused, dispatchRaise, gameId]);

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

import React, { Dispatch, useState, useEffect } from 'react';
import FooterMenu from '../../common/component/footer-menu';
import Timer from './timer';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/state';
import { Leave, Remove, Pause, Resume, Rank } from '../../core/socket/state/actions';
import { GameStatus } from '../../core/game/state/types';
import { failedRequests } from '../../app';
import isPlayerAdmin from '../../core/game/player-service';

const Play = () => {
  const isAdmin: boolean = isPlayerAdmin();
  const [isPaused, setIsPaused] = useState(false);
  let status = useSelector((state: RootState) => state.game.status);
  useEffect(() => {
    if (status === GameStatus.Paused) {
      setIsPaused(true);
      setPauseOrResume('Resume');
    } else {
      setIsPaused(false);
      setPauseOrResume('Pause');
    }
  }, [status]);
  const [pauseOrResume, setPauseOrResume] = useState('Pause');
  const gameId = useSelector((state: RootState) => state.game.data.gameId);
  const dispatchLeave = useDispatch<Dispatch<Leave>>();
  const dispatchRemove = useDispatch<Dispatch<Remove>>();
  const dispatchRank = useDispatch<Dispatch<Rank>>();
  const dispatchPause = useDispatch<Dispatch<Pause>>();
  const dispatchResume = useDispatch<Dispatch<Resume>>();
  const leave = () => {
    dispatchLeave(new Leave(gameId));
  };

  const remove = () => {
    dispatchRemove(new Remove(gameId));
  };

  const rank = () => {
    dispatchRank(new Rank(gameId));
  };

  const pauseOrUnpause = () => {
    if (pauseOrResume === 'Pause') {
      dispatchPause(new Pause(gameId));
    } else {
      dispatchResume(new Resume(gameId));
      setTimeout(() => {
        const resumeFailed = failedRequests().resume;
        if (resumeFailed) {
          window.alert('Only admin can resume the game');
        }
      }, 100);
    }
  };

  return (
    <>
      <Timer />
      <section className="hero is-primary is-fullheight has-text-centered">
        <div className="hero-body flex-column">
          <h1 className="title has-text-warning">Small: 5</h1>
          <h1 className="title has-text-primary-contrast">Big: 10</h1>
          <div className={`${styles.wide}`}>
            <button
              className="is-size-2 button is-large is-warning is-fullwidth is-rounded"
              onClick={() => pauseOrUnpause()}
            >
              {pauseOrResume}
            </button>
          </div>
          <section className="section flex-row">
            <div>
              <button
                className="is-size-3 button is-large is-dark-primary is-fullwidth is-rounded"
                onClick={() => remove()}
                disabled={isPaused}
              >
                Remove
              </button>
            </div>
            <div>
              <button
                className="is-size-3 button is-large is-danger is-fullwidth is-rounded"
                onClick={() => leave()}
                disabled={isPaused}
              >
                Leave
              </button>
            </div>
          </section>
          <div className={`${styles.wide}`}>
            <button
              className="is-size-2 button is-large is-success is-fullwidth is-rounded"
              disabled={isPaused || !isAdmin}
              onClick={() => rank()}
            >
              Rank
            </button>
          </div>
        </div>
        <FooterMenu />
      </section>
    </>
  );
};
export default Play;

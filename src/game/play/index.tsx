import React, { Dispatch, useEffect, useState } from 'react';
import FooterMenu from '../../common/component/footer-menu';
import Timer from './timer';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/state';
import { Leave, Pause, Rank, Remove, Resume } from '../../core/socket/state/actions';
import { GameStatus, Progression } from '../../core/game/state/types';
import { failedRequests } from '../../app';
import isPlayerAdmin from '../../core/game/player-service';

const Play = () => {
  const progression = useSelector((state: RootState) => state.game.data.currentProgression);
  const isAdmin: boolean = isPlayerAdmin();
  const [isPaused, setIsPaused] = useState(false);
  const [pauseOrResume, setPauseOrResume] = useState('Pause');
  const status = useSelector((state: RootState) => state.game.status);
  useEffect(() => {
    if (status === GameStatus.Paused) {
      setIsPaused(true);
      setPauseOrResume('Resume');
    } else {
      setIsPaused(false);
      setPauseOrResume('Pause');
    }
  }, [status]);
  const gameId = useSelector((state: RootState) => state.game.data.gameId);
  const dispatchLeave = useDispatch<Dispatch<Leave>>();
  const dispatchRemove = useDispatch<Dispatch<Remove>>();
  const dispatchRank = useDispatch<Dispatch<Rank>>();
  const dispatchPause = useDispatch<Dispatch<Pause>>();
  const dispatchResume = useDispatch<Dispatch<Resume>>();

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

  const renderSmall = (progression: Progression) => {
    if (progression !== undefined) {
      return <h1 className="title has-text-warning">Small: {progression.small}</h1>;
    } else {
      return <h1 className="title has-text-warning">Small: 5</h1>;
    }
  };

  const renderBig = (progression: Progression) => {
    if (progression !== undefined) {
      return <h1 className="title has-text-warning">Big: {progression.big}</h1>;
    } else {
      return <h1 className="title has-text-warning">Big: 10</h1>;
    }
  };

  return (
    <>
      <Timer />
      <section className={`hero is-primary ${styles.fullheight} has-text-centered`}>
        <div className={`hero-body flex-column ${styles.padding}`}>
          {renderSmall(progression)}
          {renderBig(progression)}
          <div className={`${styles.wide}`}>
            <button
              className="is-size-2 button is-large is-warning is-fullwidth is-rounded"
              onClick={() => pauseOrUnpause()}
            >
              {pauseOrResume}
            </button>
          </div>
          <div className="columns is-mobile has-margin-top-25">
            <div className="column">
              <button
                className="is-size-3 button is-large is-dark-primary is-fullwidth is-rounded"
                onClick={() => dispatchRemove(new Remove(gameId))}
                disabled={isPaused}
              >
                Remove
              </button>
            </div>
            <div className="column">
              <button
                className="is-size-3 button is-large is-danger is-fullwidth is-rounded"
                onClick={() => dispatchLeave(new Leave(gameId))}
                disabled={isPaused}
              >
                Leave
              </button>
            </div>
          </div>

          <div className={`${styles.wide}`}>
            <button
              className="is-size-2 button is-large is-success is-fullwidth is-rounded"
              disabled={isPaused || !isAdmin}
              onClick={() => dispatchRank(new Rank(gameId))}
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

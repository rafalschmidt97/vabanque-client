import React, { Dispatch } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../core/state';
import FooterMenu from '../../common/component/footer-menu';
import { Leave, Start } from '../../core/socket/state/actions';
import isPlayerAdmin from '../../core/game/player-service';
import { failedRequests } from '../../app';
import classNames from 'classnames';

const Lobby = () => {
  const code = useSelector((state: RootState) => state.game.data.code);
  const players = useSelector((state: RootState) => state.game.data.players);
  const gameId = useSelector((state: RootState) => state.game.data.gameId);
  const dispatchLeave = useDispatch<Dispatch<Leave>>();
  const dispatchStart = useDispatch<Dispatch<Start>>();
  const isAdmin: boolean = isPlayerAdmin();

  const leave = () => {
    dispatchLeave(new Leave(gameId));
  };

  const start = () => {
    dispatchStart(new Start(gameId));
    setTimeout(() => {
      const startFailed = failedRequests().start;
      if (startFailed) {
        window.alert('Cannot start the game with one player');
      }
    }, 100);
  };

  return (
    <>
      <section className="hero is-primary is-fullheight has-text-centered">
        <div className="hero-body flex-column">
          <section className={`section ${styles.center} `}>
            <div className="container">
              <div className="box has-text-centered is-size-2">{code}</div>
            </div>
          </section>
          <div className="is-full-width ">
            <div className={`columns ${styles.left}`}>
              {players.map(player => (
                <div className={`column ${styles.first}`} key={player.accountId}>
                  <span
                    className={classNames('icon is-size-2 ', {
                      'has-text-facebook': !player.isAdmin,
                      'has-text-danger': player.isAdmin,
                    })}
                  >
                    <i className="fas fa-user has-margin-right-10 " />
                    <label className="label is-large has-text-light">{player.accountId}</label>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <section className={`section ${styles.center}`}>
            <div className="container">
              <button
                className="is-size-2 button is-large is-success is-fullwidth is-rounded has-margin-bottom-50"
                disabled={!isAdmin}
                onClick={() => start()}
              >
                Start
              </button>
            </div>
            <div className="container">
              <button
                className="is-size-2 button is-large is-danger is-fullwidth is-rounded"
                onClick={() => leave()}
              >
                Leave
              </button>
            </div>
          </section>
        </div>
        <FooterMenu />
      </section>
    </>
  );
};
export default Lobby;

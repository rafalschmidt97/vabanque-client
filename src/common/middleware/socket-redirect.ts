import { NavigateSettings, NavigateGame } from './../../core/footer-menu/state/actions';
import { SocketResponse } from './../../core/socket/state/types';
import { GameActionTypes } from './../../core/game/state/actions';
import { Middleware } from 'redux';
import history from '../history';
import { store } from '../../app';

const socketRedirect: Middleware = () => next => action => {
  switch (action.type) {
    case GameActionTypes.Create:
      history.push('/game/lobby');
      break;
    case GameActionTypes.Join:
      history.push('/game/lobby');
      break;
    case GameActionTypes.Start:
      history.push('/game/play');
      break;
    case GameActionTypes.Leave:
      store.dispatch(new NavigateSettings());
      break;
    case GameActionTypes.Disconnect:
      store.dispatch(new NavigateGame());
      break;
    case SocketResponse.RankedWait:
      history.push('/game/rank/wait');
      break;
    case SocketResponse.RankedConfirm:
      history.push('/game/rank/admin');
      break;
    default:
      break;
  }
  next({ ...action });
};

export default socketRedirect;

import { SocketResponse } from './../../core/socket/state/types';
import { GameActionTypes } from './../../core/game/state/actions';
import { Middleware } from 'redux';
import history from '../history';

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
      history.push('/settings');
      break;
    case GameActionTypes.Disconnect:
      history.push('/settings');
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

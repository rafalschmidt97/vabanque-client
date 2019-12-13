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
    case GameActionTypes.Finish:
      console.log('redirecting to ranking screen if the user is admin');
      console.log('redirecting to await ranking screen if the user is not admin');
      break;
    case GameActionTypes.Disconnect:
      history.push('/settings');
      break;
    default:
      break;
  }
  next({ ...action });
};

export default socketRedirect;

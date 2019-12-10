import { Disconnect } from './../../core/game/state/actions';
import { Disconnected, SocketActionTypes, Connected } from './../../core/socket/state/actions';
import { Middleware, Store } from 'redux';
import SockJS from 'sockjs-client';
import { store } from '../../app';
import { AuthActionTypes } from '../../core/auth/state/actions';
import { RootState } from '../../core/state';
import socketService from '../../core/socket/socket-service';
import AppConstants from '../constants';

let socket: WebSocket | null = null;
const onOpen = (store: Store<RootState>) => () => {
  store.dispatch(new Connected());
};

const onClose = (store: Store<RootState>) => (error: CloseEvent) => {
  console.log(error);
  store.dispatch(new Disconnected());
};

function sendAction(type: string, payload: any) {
  if (type !== '' && payload !== '') {
    if (socket !== null) {
      socket.send(JSON.stringify({ type: type, payload: payload }));
    }
  }
}

const webSocket: Middleware = () => next => action => {
  switch (action.type) {
    case AuthActionTypes.Login || SocketActionTypes.Connect:
      if (socket !== null) {
        socket.close();
      }

      socket = new SockJS(`${AppConstants.appUrl}/game?access_token=${action.payload.accessToken}`);

      socket.onopen = onOpen(store);
      socket.onclose = onClose(store);
      socket.onmessage = socketService.onMessage(store);

      break;
    case SocketActionTypes.Connected:
      sendAction('create', {
        duration: '00:05:00',
        entry: '1€',
        progression: [
          { small: 5, big: 10 },
          { small: 10, big: 25 },
          { small: 25, big: 50 },
          { small: 50, big: 100 },
        ],
      });
      break;
    case SocketActionTypes.Create:
      sendAction('create', {
        duration: action.payload.duration,
        entry: action.payload.entry,
        progression: action.payload.progression,
      });
      break;
    case SocketActionTypes.Join:
      sendAction('join', { code: action.payload });
      break;
    case SocketActionTypes.Start:
      sendAction('start', { gameId: action.payload });
      break;
    case SocketActionTypes.Pause:
      sendAction('pause', { gameId: action.payload });
      break;
    case SocketActionTypes.Resume:
      sendAction('resume', { gameId: action.payload });
      break;
    case SocketActionTypes.Leave:
      sendAction('leave', { gameId: action.payload });
      break;
    case SocketActionTypes.Sync:
      sendAction('sync', { gameId: action.payload });
      break;
    case SocketActionTypes.Raise:
      sendAction('raise', { gameId: action.payload });
      break;
    case SocketActionTypes.Remove:
      sendAction('remove', { gameId: action.payload });
      break;
    case SocketActionTypes.Finish:
      sendAction('finish', { gameId: action.payload });
      break;
    case SocketActionTypes.Rank:
      sendAction('rank', { gameId: action.payload });
      break;
    case SocketActionTypes.Disconnect:
      if (socket !== null) {
        socket.close();
      }
      socket = null;
      console.log('websocket closed');
      break;
    case SocketActionTypes.Disconnected:
      store.dispatch(new Disconnect());
      break;
  }
  next({ ...action });
};

export default webSocket;

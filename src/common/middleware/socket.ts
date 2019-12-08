import {
  SocketDisconnected,
  SocketActionTypes,
  SocketConnected,
} from './../../core/socket/state/actions';
import { Middleware, Store } from 'redux';
import SockJS from 'sockjs-client';
import { store } from '../../app';
import { AuthActionTypes } from '../../core/auth/state/actions';
import { RootState } from '../../core/state';
import socketService from '../util/socket-service';

let socket: WebSocket | null = null;
const onOpen = (store: Store<RootState>) => () => {
  store.dispatch(new SocketConnected());
};

const onClose = (store: Store<RootState>) => (error: CloseEvent) => {
  console.log(error);
  store.dispatch(new SocketDisconnected());
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

      socket = new SockJS(`http://localhost:8080/game?access_token=${action.payload.accessToken}`);

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
    case SocketActionTypes.Join:
      sendAction('join', { code: action.payload });
      break;
    case SocketActionTypes.Create:
      sendAction('create', { code: action.payload });
      break;
    case SocketActionTypes.Disconnect:
      if (socket !== null) {
        socket.close();
      }
      socket = null;
      console.log('websocket closed');
      break;
  }
  next({ ...action });
};

export default webSocket;

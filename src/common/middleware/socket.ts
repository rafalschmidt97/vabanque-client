import { GameJoin } from './../../core/game/state/actions';
import {
  SocketDisconnected,
  SocketActionTypes,
  SocketConnected,
} from './../../core/socket/state/actions';
import { Middleware, Store } from 'redux';
import SockJS from 'sockjs-client';
import { store } from '../../app';
import { AuthActionTypes } from '../../core/auth/state/actions';
import { GameCreate, GameFailedJoin } from '../../core/game/state/actions';
import { RootState } from '../../core/state';

let socket: WebSocket | null = null;
const onOpen = (store: Store<RootState>) => () => {
  store.dispatch(new SocketConnected());
};

const onClose = (store: Store<RootState>) => (error: CloseEvent) => {
  console.log(error);
  store.dispatch(new SocketDisconnected());
};

const onMessage = (store: Store<RootState>) => (message: MessageEvent) => {
  const decodedMessage = JSON.parse(message.data);
  console.log(`message ${JSON.stringify(decodedMessage)}`);
  switch (decodedMessage.type) {
    case 'created_confirm':
      store.dispatch(new GameCreate(decodedMessage.payload));
      break;
    case 'join_confirm':
      store.dispatch(new GameJoin(decodedMessage.payload));
      break;
    case 'error':
      store.dispatch(new GameFailedJoin());
  }
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
      socket.onmessage = onMessage(store);

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

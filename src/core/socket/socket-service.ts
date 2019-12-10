import {
  Pause,
  Leave,
  Start,
  Resume,
  Create,
  Join,
  FailedJoin,
  Sync as GameSync,
  Raise,
} from './../game/state/actions';
import { SocketResponse, SocketErrorResponse } from './state/types';
import { Store } from 'redux';
import { RootState } from '../state';
import { Sync as SocketSync } from './state/actions';

class SocketService {
  onMessage = (store: Store<RootState>) => (message: MessageEvent) => {
    const decodedMessage = JSON.parse(message.data);
    console.log(`message ${JSON.stringify(decodedMessage)}`);
    switch (decodedMessage.type) {
      case SocketResponse.CreatedConfirm:
        store.dispatch(new Create(decodedMessage.payload));
        break;
      case SocketResponse.PlayerJoined || SocketResponse.PlayerLeft:
        store.dispatch(new SocketSync(decodedMessage.payload));
        break;
      case SocketResponse.JoinedConfirm:
        store.dispatch(new Join(decodedMessage.payload));
        break;
      case SocketResponse.Started:
        store.dispatch(new Start(decodedMessage.payload.startedAt));
        break;
      case SocketResponse.Paused:
        store.dispatch(new Pause());
        break;
      case SocketResponse.Resumed:
        store.dispatch(new Resume());
        break;
      case SocketResponse.LeftConfirm || SocketResponse.Removed || SocketResponse.RemovedConfirm:
        store.dispatch(new Leave());
        break;
      case SocketResponse.Sync:
        store.dispatch(new GameSync(decodedMessage.payload));
        break;
      case SocketResponse.Raised:
        store.dispatch(new Raise(decodedMessage.payload.progression));
        break;
      case SocketResponse.Error:
        switch (decodedMessage.payload.type) {
          case SocketErrorResponse.JoinFailed:
            store.dispatch(new FailedJoin());
        }
    }
  };
}

const socketService = new SocketService();
export default socketService;

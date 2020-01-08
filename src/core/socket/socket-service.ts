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
  FailedCreate,
  FailedStart,
  FailedResume,
} from './../game/state/actions';
import { SocketResponse, SocketErrorResponse } from './state/types';
import { Store } from 'redux';
import { RootState } from '../state';
import { Sync as SocketSync } from './state/actions';
import history from '../../common/history';
import { NavigateSettings } from '../footer-menu/state/actions';

class SocketService {
  onMessage = (store: Store<RootState>) => (message: MessageEvent) => {
    const decodedMessage = JSON.parse(message.data);
    console.log(`message ${JSON.stringify(decodedMessage)}`);
    switch (decodedMessage.type) {
      case SocketResponse.CreatedConfirm:
        store.dispatch(new Create(decodedMessage.payload));
        break;
      case SocketResponse.PlayerJoined:
        store.dispatch(new SocketSync(decodedMessage.payload.gameId));
        break;
      case SocketResponse.PlayerLeft:
        store.dispatch(new SocketSync(decodedMessage.payload.gameId));
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
      case SocketResponse.LeftConfirm:
        store.dispatch(new Leave());
        break;
      case SocketResponse.Removed:
        store.dispatch(new Leave());
        break;
      case SocketResponse.RemovedConfirm:
        store.dispatch(new Leave());
        break;
      case SocketResponse.Sync:
        store.dispatch(new GameSync(decodedMessage.payload));
        break;
      case SocketResponse.Raised:
        store.dispatch(new Raise(decodedMessage.payload.progression));
        break;
      case SocketResponse.RankedWait:
        history.push('/game/rank/wait');
        break;
      case SocketResponse.RankedConfirm:
        history.push('/game/rank/admin');
        break;
      case SocketResponse.Finished:
        store.dispatch(new NavigateSettings());
        history.push('/settings');
        break;
      case SocketResponse.Error:
        switch (decodedMessage.payload.type) {
          case SocketErrorResponse.JoinFailed:
            store.dispatch(new FailedJoin());
            break;
          case SocketErrorResponse.CreateFailed:
            store.dispatch(new FailedCreate());
            break;
          case SocketErrorResponse.StartFailed:
            store.dispatch(new FailedStart());
            break;
          case SocketErrorResponse.ResumeFailed:
            store.dispatch(new FailedResume());
        }
    }
  };
}

const socketService = new SocketService();
export default socketService;

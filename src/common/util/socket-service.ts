import { GameStart } from './../../core/game/state/actions';
import { Store } from 'redux';
import { RootState } from '../../core/state';
import { GameCreate, GameJoin, GameFailedJoin } from '../../core/game/state/actions';

class SocketService {
  onMessage = (store: Store<RootState>) => (message: MessageEvent) => {
    const decodedMessage = JSON.parse(message.data);
    console.log(`message ${JSON.stringify(decodedMessage)}`);
    switch (decodedMessage.type) {
      case 'created_confirm':
        store.dispatch(new GameCreate(decodedMessage.payload));
        break;
      case 'join_confirm':
        store.dispatch(new GameJoin(decodedMessage.payload));
        break;
      case 'started':
        store.dispatch(new GameStart(decodedMessage.payload.startedAt));
        break;
      case 'error':
        switch (decodedMessage.payload.type) {
          case 'GAME_JOIN_FAILED':
            store.dispatch(new GameFailedJoin());
        }
    }
  };
}

const socketService = new SocketService();
export default socketService;

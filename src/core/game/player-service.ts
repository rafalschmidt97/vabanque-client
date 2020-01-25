import { store } from '../../app';
import { Player } from './state/types';

const isPlayerAdmin = () => {
  const players: Player[] = store.getState().game.data.players;
  const playerId: number = store.getState().profile.id;
  let isAdmin = false;
  players.forEach(element => {
    if (element.isAdmin) {
      if (element.accountId === playerId) {
        isAdmin = true;
      }
    }
  });
  return isAdmin;
};

export default isPlayerAdmin;

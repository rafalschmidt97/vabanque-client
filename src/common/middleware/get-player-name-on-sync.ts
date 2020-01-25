import { GameActionTypes } from '../../core/game/state/actions';
import { Middleware } from 'redux';
import { Player } from '../../core/game/state/types';
import accountApi from '../../core/game/api';

const getPlayerNames: Middleware = () => next => async action => {
  if (
    action.type === GameActionTypes.Sync ||
    action.type === GameActionTypes.Join ||
    action.type === GameActionTypes.Create
  ) {
    const players: Player[] = action.payload.players;
    await Promise.all(
      players.map(async player => {
        await accountApi.getPlayerNickname(player.accountId).then(data => {
          player.nickname = data;
        });
      }),
    );
  }
  next({ ...action });
};

export default getPlayerNames;

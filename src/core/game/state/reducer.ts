import { Reducer } from 'redux';
import { GameState } from './types';
import { GameActions, GameActionTypes } from './actions';

const initialState: GameState = {
  game: { gameId: '', code: '', duration: new Date(0), entry: '', progression: [], players: [] },
  failedRequests: { join: false },
};

export const GameReducer: Reducer<GameState, GameActions> = (state = initialState, action) => {
  switch (action.type) {
    case GameActionTypes.Create: {
      return {
        ...state,
        game: action.payload,
      };
    }
    case GameActionTypes.Join: {
      return {
        ...state,
        game: action.payload,
        failedRequests: { join: false },
      };
    }
    case GameActionTypes.FailedJoin: {
      return {
        ...state,
        failedRequests: { join: true },
      };
    }
  }

  return state;
};

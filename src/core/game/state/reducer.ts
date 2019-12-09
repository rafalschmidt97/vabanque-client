import { Reducer } from 'redux';
import { GameState } from './types';
import { GameActions, GameActionTypes } from './actions';

const initialState: GameState = {
  game: {
    gameId: '',
    code: '',
    duration: new Date(0),
    entry: '',
    progression: [],
    players: [],
    startedAt: new Date(0),
  },
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
    case GameActionTypes.Start: {
      return {
        ...state,
        game: {
          ...state.game,
          startedAt: action.payload,
        },
      };
    }
    case GameActionTypes.FailedJoin: {
      return {
        ...state,
        failedRequests: {
          ...state.failedRequests,
          join: true,
        },
      };
    }
  }

  return state;
};

import { Reducer } from 'redux';
import { GameState, GameStatus } from './types';
import { GameActions, GameActionTypes } from './actions';

const initialState: GameState = {
  status: GameStatus.Idle,
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
        status: GameStatus.InLobby,
        game: action.payload,
      };
    }
    case GameActionTypes.Join: {
      return {
        ...state,
        status: GameStatus.InLobby,
        game: action.payload,
        failedRequests: { join: false },
      };
    }
    case GameActionTypes.Start: {
      return {
        ...state,
        game: {
          ...state.game,
          status: GameStatus.Playing,
          startedAt: action.payload,
        },
      };
    }
    case GameActionTypes.Pause: {
      return {
        ...state,
        game: {
          ...state.game,
          status: GameStatus.Paused,
        },
      };
    }
    case GameActionTypes.Resume: {
      return {
        ...state,
        game: {
          ...state.game,
          status: GameStatus.Playing,
        },
      };
    }
    case GameActionTypes.Leave: {
      return {
        ...state,
        state: initialState,
      };
    }
    case GameActionTypes.Sync: {
      return {
        ...state,
        game: action.payload,
      };
    }
    case GameActionTypes.Raise: {
      return {
        ...state,
        game: {
          ...state.game,
          progression: action.payload,
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

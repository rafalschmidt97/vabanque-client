import { Reducer } from 'redux';
import { GameState, GameStatus } from './types';
import { GameActions, GameActionTypes } from './actions';

const initialState: GameState = {
  status: GameStatus.Idle,
  data: {
    gameId: '',
    code: '',
    duration: new Date(0),
    entry: '',
    progression: [],
    players: [],
    startedAt: new Date(0),
  },
  failedRequests: { join: false, create: false, start: false },
};

export const GameReducer: Reducer<GameState, GameActions> = (state = initialState, action) => {
  switch (action.type) {
    case GameActionTypes.Create: {
      return {
        ...state,
        status: GameStatus.InLobby,
        data: action.payload,
      };
    }
    case GameActionTypes.Join: {
      return {
        ...state,
        status: GameStatus.InLobby,
        data: action.payload,
        failedRequests: {
          ...state.failedRequests,
          join: false,
        },
      };
    }
    case GameActionTypes.Start: {
      return {
        ...state,
        data: {
          ...state.data,
          status: GameStatus.Playing,
          startedAt: action.payload,
        },
      };
    }
    case GameActionTypes.Pause: {
      return {
        ...state,
        data: {
          ...state.data,
          status: GameStatus.Paused,
        },
      };
    }
    case GameActionTypes.Resume: {
      return {
        ...state,
        data: {
          ...state.data,
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
        data: action.payload,
      };
    }
    case GameActionTypes.Raise: {
      return {
        ...state,
        data: {
          ...state.data,
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
    case GameActionTypes.FailedCreate: {
      return {
        ...state,
        failedRequests: {
          ...state.failedRequests,
          create: true,
        },
      };
    }
    case GameActionTypes.FailedStart: {
      return {
        ...state,
        failedRequests: {
          ...state.failedRequests,
          start: true,
        },
      };
    }
  }

  return state;
};

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
  failedRequests: { join: false, create: false, start: false, resume: false },
};

export const GameReducer: Reducer<GameState, GameActions> = (state = initialState, action) => {
  switch (action.type) {
    case GameActionTypes.Create: {
      return {
        ...state,
        status: GameStatus.InLobby,
        data: action.payload,
        failedRequests: {
          ...state.failedRequests,
          create: false,
        },
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
        status: GameStatus.Playing,
        data: {
          ...state.data,
          startedAt: action.payload,
        },
        failedRequests: {
          ...state.failedRequests,
          start: false,
        },
      };
    }
    case GameActionTypes.Pause: {
      return {
        ...state,
        status: GameStatus.Paused,
      };
    }
    case GameActionTypes.Resume: {
      return {
        ...state,
        status: GameStatus.Playing,
        failedRequests: {
          ...state.failedRequests,
          resume: false,
        },
      };
    }
    case GameActionTypes.Leave: {
      return {
        ...state,
        data: initialState.data,
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
    case GameActionTypes.FailedResume: {
      return {
        ...state,
        failedRequests: {
          ...state.failedRequests,
          resume: true,
        },
      };
    }
  }

  return state;
};

import { Progression } from '../../game/state/types';

export type GameId = string;

export type Code = string;

export type AccessToken = string;

export interface GameSettings {
  duration: Date;
  entry: string;
  progression: Progression[];
}

export interface Ranks {
  gameId: GameId;
  rankedAccountsIds: number[];
}

export enum SocketResponse {
  CreatedConfirm = 'created_confirm',
  PlayerJoined = 'player_joined',
  JoinedConfirm = 'joined_confirm',
  Started = 'started',
  Paused = 'paused',
  Resumed = 'resumed',
  PlayerLeft = 'player_left',
  LeftConfirm = 'left_confirm',
  Sync = 'sync',
  Raised = 'raised',
  Removed = 'removed',
  RemovedConfirm = 'removed_confirm',
  RankedWait = 'ranked_wait',
  RankedConfirm = 'ranked_confirm',
  Finished = 'finished',
  PlayerReconnected = 'player_reconnected',
  PlayerDisconnected = 'player_disconnected',
  Error = 'error',
}

export enum SocketErrorResponse {
  JoinFailed = 'GAME_JOIN_FAILED',
  CreateFailed = 'GAME_CREATE_FAILED',
  StartFailed = 'GAME_START_FAILED',
  ResumeFailed = 'GAME_RESUME_FAILED',
  LeaveFailed = 'GAME_LEAVE_FAILED',
}

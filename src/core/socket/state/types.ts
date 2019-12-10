import { Progression } from '../../game/state/types';

export type gameId = string;

export type code = string;

export type accessToken = string;

export interface GameSettings {
  duration: Date;
  entry: string;
  progression: Progression[];
}

export interface Ranks {
  gameId: gameId;
  rankedAccountsIds: number[];
}

export enum SocketResponse {
  Created = 'created',
  PlayerJoined = 'player_joined',
  Joined = 'joined',
  Started = 'started',
  Paused = 'paused',
  Resumed = 'resumed',
  PlayerLeft = 'player_left',
  Left = 'left',
  Sync = 'sync',
  Raised = 'raised',
  PlayerRemoved = 'player_removed',
  Removed = 'removed',
  FinishedWait = 'finished_wait',
  Finished = 'finished',
  Ranked = 'ranked',
  PlayerReconnected = 'player_reconnected',
  PlayerDisconnected = 'player_disconnected',
  Error = 'error',
  JoinFailed = 'GAME_JOIN_FAILED',
}

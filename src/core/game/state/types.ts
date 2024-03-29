export interface GameState {
  status: GameStatus;
  data: GameData;
  failedRequests: FailedRequests;
}

export enum GameStatus {
  Idle = 'idle',
  InLobby = 'in_lobby',
  Playing = 'playing',
  Paused = 'paused',
}

export interface GameData {
  gameId: string;
  code: string;
  duration: Date;
  entry: string;
  progression: Progression[];
  currentProgression: Progression;
  players: Player[];
  startedAt: Date;
}

export interface Progression {
  small: number;
  big: number;
}

export interface Player {
  accountId: number;
  isAdmin: boolean;
  isConnected: boolean;
  nickname: string;
}

interface FailedRequests {
  join: boolean;
  create: boolean;
  start: boolean;
  resume: boolean;
}

export type startedAt = Date;

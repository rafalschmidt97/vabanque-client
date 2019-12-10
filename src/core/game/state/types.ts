export interface GameState {
  status: GameStatus;
  game: Game;
  failedRequests: FailedRequests;
}

export enum GameStatus {
  Idle = 'idle',
  InLobby = 'in_lobby',
  Playing = 'playing',
  Paused = 'paused',
}

export interface Game {
  gameId: string;
  code: string;
  duration: Date;
  entry: string;
  progression: Progression[];
  players: Player[];
  startedAt: Date;
}

export interface Progression {
  small: number;
  big: number;
}

interface Player {
  accountId: number;
  isAdmin: boolean;
  isConnected: boolean;
}

interface FailedRequests {
  join: boolean;
}

export type startedAt = Date;

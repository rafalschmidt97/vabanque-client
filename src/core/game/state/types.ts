export interface GameState {
  game: Game;
  failedRequests: FailedRequests;
}

export interface Game {
  gameId: string;
  code: string;
  duration: Date;
  entry: string;
  progression: Progression[];
  players: Player[];
}

interface Progression {
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

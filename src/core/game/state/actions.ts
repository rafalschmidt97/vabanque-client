import { Action } from 'redux';
import { Game } from './types';

export enum GameActionTypes {
  Create = '[Game] Create',
  Finish = '[Game] Finish',
  Join = '[Game] Join',
  FailedJoin = '[Game] Failed Join',
  Leave = '[Game] Leave',
  MarkInGameAsDisconnnected = '[Game] MarkInGameAsDisconnnected',
  Pause = '[Game] Pause',
  Raise = '[Game] Raise',
  Rank = '[Game] Rank',
  Remove = '[Game] Remove',
  Resume = '[Game] Resume',
  Start = '[Game] Start',
  Sync = '[Game] Sync',
}

export class GameCreate implements Action {
  readonly type = GameActionTypes.Create;
  payload: Game;

  constructor(game: Game) {
    this.payload = game;
  }
}

export class GameFinish implements Action {
  readonly type = GameActionTypes.Finish;
}

export class GameJoin implements Action {
  readonly type = GameActionTypes.Join;
  payload: Game;

  constructor(game: Game) {
    this.payload = game;
  }
}

export class GameFailedJoin implements Action {
  readonly type = GameActionTypes.FailedJoin;
}

export class GameLeave implements Action {
  readonly type = GameActionTypes.Leave;
}

export class GameMarkInGameAsDisconnnected implements Action {
  readonly type = GameActionTypes.MarkInGameAsDisconnnected;
}

export class GamePause implements Action {
  readonly type = GameActionTypes.Pause;
}

export class GameRaise implements Action {
  readonly type = GameActionTypes.Raise;
}

export class GameRank implements Action {
  readonly type = GameActionTypes.Rank;
}

export class GameRemove implements Action {
  readonly type = GameActionTypes.Remove;
}

export class GameResume implements Action {
  readonly type = GameActionTypes.Resume;
}

export class GameStart implements Action {
  readonly type = GameActionTypes.Start;
}

export class GameSync implements Action {
  readonly type = GameActionTypes.Sync;
}

export type GameActions =
  | GameCreate
  | GameFinish
  | GameFailedJoin
  | GameJoin
  | GameLeave
  | GameMarkInGameAsDisconnnected
  | GamePause
  | GameRaise
  | GameRank
  | GameRemove
  | GameResume
  | GameStart
  | GameSync;

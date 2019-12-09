import { Progression } from '../../game/state/types';

export type gameId = string;

export type code = string;

export type accessToken = string;

export interface GameSettings {
  duration: Date;
  entry: string;
  progression: Progression[];
}

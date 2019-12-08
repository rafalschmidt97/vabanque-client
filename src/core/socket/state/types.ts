import { Progression } from '../../game/state/types';

export type Code = string;

export interface GameSettings {
  duration: Date;
  entry: string;
  progression: Progression[];
}

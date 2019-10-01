import { Action } from 'redux';

export enum OverviewActionTypes {
  IncrementCounter = '[Panel] Increment Counter',
  UpdateCounter = '[Panel] Update Counter',
}

export class IncrementCounter implements Action {
  readonly type = OverviewActionTypes.IncrementCounter;
}

export class UpdateCounter implements Action {
  readonly type = OverviewActionTypes.UpdateCounter;
  constructor(public readonly payload: number) {}
}

export type OverviewActions = IncrementCounter | UpdateCounter;

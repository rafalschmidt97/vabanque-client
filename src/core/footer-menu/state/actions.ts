import { Action } from 'redux';

export enum FooterActionTypes {
  NavigateGame = '[Footer] Navigate Game',
  NavigateMoney = '[Footer] Navigate Money',
  NavigateSettings = '[Footer] Navigate Settings',
}

export class NavigateGame implements Action {
  readonly type = FooterActionTypes.NavigateGame;
}

export class NavigateMoney implements Action {
  readonly type = FooterActionTypes.NavigateMoney;
}

export class NavigateSettings implements Action {
  readonly type = FooterActionTypes.NavigateSettings;
}

export type FooterActions = NavigateGame | NavigateMoney | NavigateSettings;

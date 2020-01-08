import { Reducer } from 'redux';
import { FooterState } from './types';
import { FooterActions, FooterActionTypes } from './actions';

const initialState: FooterState = {
  isGameActive: false,
  isMoneyActive: false,
  isSettingsActive: true,
};

export const FooterReducer: Reducer<FooterState, FooterActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FooterActionTypes.NavigateGame: {
      return {
        ...state,
        isGameActive: true,
        isMoneyActive: false,
        isSettingsActive: false,
      };
    }
    case FooterActionTypes.NavigateMoney: {
      return {
        ...state,
        isGameActive: false,
        isMoneyActive: true,
        isSettingsActive: false,
      };
    }
    case FooterActionTypes.NavigateSettings: {
      return {
        ...state,
        isGameActive: false,
        isMoneyActive: false,
        isSettingsActive: true,
      };
    }
  }

  return state;
};

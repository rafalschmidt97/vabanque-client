import { Reducer } from 'redux';
import { OverviewActions, OverviewActionTypes } from './actions';
import { OverviewState } from './types';

const initialState: OverviewState = {
  counter: 2,
};

export const OverviewReducer: Reducer<OverviewState, OverviewActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case OverviewActionTypes.IncrementCounter: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case OverviewActionTypes.UpdateCounter: {
      return {
        ...state,
        counter: action.payload,
      };
    }
  }

  return state;
};

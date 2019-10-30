import { OverviewReducer } from '../../../panel/overview/reducer';
import { OverviewState } from '../../../panel/overview/OverviewState';
import { applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import actionToPlainObject from '../../../common/middleware/action-to-plain-object';
import isProduction from '../../../common/utils/is-production';
import { AuthReducer } from '../../auth/state/reducer';
import { AuthState } from '../../auth/types';

export interface RootState {
  auth: AuthState;
  overview: OverviewState;
}

const RootReducers: Reducer = combineReducers({
  auth: AuthReducer,
  overview: OverviewReducer,
});

export function createStoreWithMiddleware(): Store {
  const middleware = applyMiddleware(actionToPlainObject, thunk);

  if (isProduction) {
    return createStore(RootReducers, compose(middleware));
  } else {
    return createStore(RootReducers, composeWithDevTools(middleware));
  }
}

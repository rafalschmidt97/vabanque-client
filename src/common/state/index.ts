import { OverviewReducer, OverviewState } from '../../panel/overview/reducer';
import { applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import actionToPlainObject from './middleware/action-to-plain-object';
import isProduction from '../utils/is-production';
import { AuthState, AuthReducer } from '../../core/auth/reducer';

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

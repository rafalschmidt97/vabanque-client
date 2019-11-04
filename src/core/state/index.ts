import { ProfileState } from './../profile/state/types';
import { ProfileReducer } from './../profile/state/reducer';
import { OverviewReducer } from '../overview/state/reducer';
import { OverviewState } from '../overview/state/types';
import { applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import actionToPlainObject from '../../common/middleware/action-to-plain-object';
import isProduction from '../../common/util/is-production';
import { AuthReducer } from '../auth/state/reducer';
import clearLocalStorageOnLogout from '../../common/middleware/clearLocalStorageOnLogout';
import setTokens from '../../common/middleware/setTokens';
import { AuthState } from '../auth/state/types';
import updateProfile from '../../common/middleware/setProfile';

export interface RootState {
  auth: AuthState;
  overview: OverviewState;
  profile: ProfileState;
}

const RootReducers: Reducer = combineReducers({
  auth: AuthReducer,
  overview: OverviewReducer,
  profile: ProfileReducer,
});

export function createStoreWithMiddleware(): Store {
  const middlewares = [
    actionToPlainObject,
    thunk,
    clearLocalStorageOnLogout,
    setTokens,
    updateProfile,
  ];
  const middleware = applyMiddleware(...middlewares);

  if (isProduction) {
    return createStore(RootReducers, compose(middleware));
  } else {
    return createStore(RootReducers, composeWithDevTools(middleware));
  }
}

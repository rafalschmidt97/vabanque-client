import { FooterReducer } from './../footer-menu/state/reducer';
import { FooterState } from './../footer-menu/state/types';
import { GameState } from './../game/state/types';
import { GameReducer } from './../game/state/reducer';
import { ProfileState } from './../profile/state/types';
import { ProfileReducer } from './../profile/state/reducer';
import { combineReducers, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import actionToPlainObject from '../../common/middleware/action-to-plain-object';
import isProduction from '../../common/util/is-production';
import { AuthReducer } from '../auth/state/reducer';
import clearLocalStorageOnLogout from '../../common/middleware/clear-local-storage-on-logout';
import setTokens from '../../common/middleware/set-tokens';
import { AuthState } from '../auth/state/types';
import updateProfile from '../../common/middleware/set-profile';
import scoket from '../../common/middleware/socket';
import socketRedirect from '../../common/middleware/socket-redirect';
import { configureStore } from '@reduxjs/toolkit';
import getPlayerNames from '../../common/middleware/get-player-name-on-sync';
import footerMenuRedirect from '../../common/middleware/footer-menu-redirect';

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  game: GameState;
  footer: FooterState;
}

const RootReducers: Reducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  game: GameReducer,
  footer: FooterReducer,
});

export function createStoreWithMiddleware(): Store {
  const middlewares = [
    actionToPlainObject,
    thunk,
    clearLocalStorageOnLogout,
    setTokens,
    updateProfile,
    scoket,
    socketRedirect,
    footerMenuRedirect,
    getPlayerNames,
  ];

  if (isProduction) {
    return configureStore({ reducer: RootReducers, middleware: middlewares });
  } else {
    return configureStore({ reducer: RootReducers, middleware: middlewares });
  }
}

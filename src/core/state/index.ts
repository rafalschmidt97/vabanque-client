import { applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import actionToObjectMiddleware from '../../common/state/middleware/action-to-plain-object';
import isProduction from '../../common/utils/is-production';
import { AuthReducer, AuthState } from '../auth/reducer';

export interface RootState {
  auth: AuthState;
}

const RootReducers: Reducer = combineReducers({
  auth: AuthReducer,
});

export function createStoreWithMiddleware(): Store {
  const middleware = applyMiddleware(actionToObjectMiddleware, thunk);

  if (isProduction) {
    return createStore(RootReducers, compose(middleware));
  } else {
    return createStore(RootReducers, composeWithDevTools(middleware));
  }
}

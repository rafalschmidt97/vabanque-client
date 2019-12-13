import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './core/state';
import LoginComponent from './home/login';
import ProtectedRoute from './common/component/protected-route';
import NotFound from './common/component/not-found';
import UserRoute from './common/component/user-route';
import Settings from './settings';
import UpdateProfileForm from './settings/update-profile-form';
import Game from './game';
import history from './common/history';
import Play from './game/play';
import RankWait from './game/rank/wait';

export const store = createStoreWithMiddleware();
export const failedRequests = () => {
  return store.getState().game.failedRequests;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <UserRoute path="/login" component={LoginComponent} />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/update-profile" component={UpdateProfileForm} />
          <ProtectedRoute path="/game" component={Game} />
          <Redirect exact from="/" to="login" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

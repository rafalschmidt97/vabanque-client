import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './core/overview/state';
import Login from './home/sign-in';
import UserSettings from './user-settings';
import Overview from './panel/overview';
import ProtectedRoute from './common/components/protected-route';
import NotFound from './common/components/not-found';

export const store = createStoreWithMiddleware();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/user-settings" component={UserSettings} />
          <ProtectedRoute path="/overview" component={Overview} />
          <Redirect exact from="/" to="login" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

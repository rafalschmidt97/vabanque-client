import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './core/state';
import LoginComponent from './home/login';
import Overview from './panel/overview';
import ProtectedRoute from './common/component/protected-route';
import NotFound from './common/component/not-found';
import UserRoute from './common/component/user-route';
import UserSettings from './user-settings';
import UpdateProfileForm from './user-settings/update-profile-form';

export const store = createStoreWithMiddleware();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <UserRoute path="/login" component={LoginComponent} />
          <ProtectedRoute path="/user-settings" component={UserSettings} />
          <ProtectedRoute path="/update-profile" component={UpdateProfileForm} />
          <ProtectedRoute path="/overview" component={Overview} />
          <Redirect exact from="/" to="login" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

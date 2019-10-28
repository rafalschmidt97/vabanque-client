import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './common/state';
import SignIn from './home/sign-in';
import UserSettings from './user-settings';
import Overview from './panel/overview';

const store = createStoreWithMiddleware();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/user-settings" component={UserSettings} />
          <Route path="/overview" component={Overview} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

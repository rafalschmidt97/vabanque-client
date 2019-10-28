import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './common/state';
import SignIn from './home/sign-in';
import UpdateInfoForm from './user-settings';
import Overview from './panel/overview';

const store = createStoreWithMiddleware();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/update-info" component={UpdateInfoForm} />
          <Route path="/overview" component={Overview} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

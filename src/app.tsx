import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './common/state';
import SignIn from './home/sign-in';
import UpdateInfoForm from './home/sign-in/form';

const store = createStoreWithMiddleware();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/update-info" component={UpdateInfoForm} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

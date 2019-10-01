import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from './common/state';
import SignIn from './home/sign-in';
import Panel from './panel';

const store = createStoreWithMiddleware();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/panel" component={Panel} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

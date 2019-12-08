import React from 'react';
import { Switch, useLocation, Redirect } from 'react-router';
import ProtectedRoute from '../common/component/protected-route';
import Start from './start';
import JoinGame from './find-lobby';

const Game = () => {
  const path = useLocation();
  return (
    <>
      <Switch>
        <ProtectedRoute path="/game/start" component={Start} />
        <ProtectedRoute path="/game/find-lobby" component={JoinGame} />
        <Redirect exact from={`${path.pathname}/`} to={`${path.pathname}/start`} />
      </Switch>
    </>
  );
};
export default Game;

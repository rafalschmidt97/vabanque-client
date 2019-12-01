import React from 'react';
import { Switch, useLocation, Redirect } from 'react-router';
import ProtectedRoute from '../common/component/protected-route';
import GameStart from './game-start';

const Game = () => {
  const path = useLocation();
  return (
    <>
      <Switch>
        <ProtectedRoute path="/game/start" component={GameStart} />
        <Redirect exact from={`${path.pathname}/`} to={`${path.pathname}/start`} />
      </Switch>
    </>
  );
};
export default Game;

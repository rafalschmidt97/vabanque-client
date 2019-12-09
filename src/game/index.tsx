import React from 'react';
import { Switch, Redirect, RouteComponentProps } from 'react-router';
import ProtectedRoute from '../common/component/protected-route';
import Start from './start';
import JoinGame from './find-lobby';

const Game = (props: RouteComponentProps) => {
  const { path } = props.match;

  return (
    <>
      <Switch>
        <Redirect exact from={`${path}/`} to={`${path}/start`} />
        <ProtectedRoute exact path={`${path}/start`} component={Start} />
        <ProtectedRoute exact path={`${path}/find-lobby`} component={JoinGame} />
      </Switch>
    </>
  );
};
export default Game;

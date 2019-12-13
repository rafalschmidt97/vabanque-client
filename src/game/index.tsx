import React from 'react';
import { Switch, Redirect, RouteComponentProps } from 'react-router';
import ProtectedRoute from '../common/component/protected-route';
import StartGame from './start';
import FindLobby from './find-lobby';
import CreateGame from './create';
import Lobby from './lobby';
import Play from './play';

const Game = (props: RouteComponentProps) => {
  const { path } = props.match;

  return (
    <>
      <Switch>
        <Redirect exact from={`${path}/`} to={`${path}/start`} />
        <ProtectedRoute exact path={`${path}/start`} component={StartGame} />
        <ProtectedRoute exact path={`${path}/find-lobby`} component={FindLobby} />
        <ProtectedRoute exact path={`${path}/create`} component={CreateGame} />
        <ProtectedRoute exact path={`${path}/lobby`} component={Lobby} />
        <ProtectedRoute exact path={`${path}/play`} component={Play} />
      </Switch>
    </>
  );
};
export default Game;

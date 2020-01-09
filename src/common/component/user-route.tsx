import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import { useDispatch } from 'react-redux';
import localStorageService from '../../core/auth/localStorageService';
import authApi from '../../core/auth/api';
import { Dispatch } from 'react';
import { Login } from '../../core/auth/state/actions';
import LoginComponent from '../../home/login';
import { NavigateGame } from '../../core/footer-menu/state/actions';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

const UserRoute = ({ ...rest }: any) => {
  const dispatchLogin = useDispatch<Dispatch<Login>>();
  const dispatchNavigateGame = useDispatch<Dispatch<NavigateGame>>();
  const refreshToken = localStorageService.getRefreshToken();

  if (refreshToken) {
    authApi.refreshToken({ refreshToken: refreshToken }).then(tokens => {
      if (tokens) {
        dispatchLogin(new Login(tokens));
        dispatchNavigateGame(new NavigateGame());
      }
    });
  }

  return <Route {...rest} component={LoginComponent} />;
};

export default UserRoute;

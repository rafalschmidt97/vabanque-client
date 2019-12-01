import * as React from 'react';
import { Route, RouteProps, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import localStorageService from '../../core/auth/localStorageService';
import authApi from '../../core/auth/api';
import { Dispatch } from 'react';
import { Login } from '../../core/auth/state/actions';
import LoginComponent from '../../home/login';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

const UserRoute = ({ ...rest }: any) => {
  const history = useHistory();
  const dispatchLogin = useDispatch<Dispatch<Login>>();
  const refreshToken = localStorageService.getRefreshToken();

  if (refreshToken) {
    authApi.refreshToken({ refreshToken: refreshToken }).then(tokens => {
      if (tokens) {
        dispatchLogin(new Login(tokens));
        history.push('/settings');
      }
    });
  }

  return <Route {...rest} component={LoginComponent} />;
};

export default UserRoute;

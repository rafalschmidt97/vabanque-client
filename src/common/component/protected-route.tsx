import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/state';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

const ProtectedRoute = ({ component, ...rest }: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default ProtectedRoute;

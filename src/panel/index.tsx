import React from 'react';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Overview from './overview';

const Portal = (props: RouteComponentProps) => {
  const { path } = props.match;

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="navbar-brand">VaBanque</div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink to={`${path}/`} className="nav-link">
                Page 1
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${path}/`} className="nav-link">
                Page 2
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${path}/`} className="nav-link">
                Page 3
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container">
        <Switch>
          <Route exact path={`${path}/`} component={Overview} />
        </Switch>
      </main>
    </>
  );
};

export default Portal;

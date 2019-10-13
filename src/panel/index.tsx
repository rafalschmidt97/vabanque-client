import React from 'react';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Overview from './overview';

const Portal = (props: RouteComponentProps) => {
  const { path } = props.match;

  return (
    <>
      <nav className="">
        <div className="">VaBanque</div>
        <div className="">
          <ul className="">
            <li className="">
              <NavLink to={`${path}/`} className="">
                Page 1
              </NavLink>
            </li>
            <li className="">
              <NavLink to={`${path}/`} className="">
                Page 2
              </NavLink>
            </li>
            <li className="">
              <NavLink to={`${path}/`} className="">
                Page 3
              </NavLink>
            </li>
          </ul>
          <ul className="">
            <li className="">
              <NavLink to="/" className="">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main className="">
        <Switch>
          <Route exact path={`${path}/`} component={Overview} />
        </Switch>
      </main>
    </>
  );
};

export default Portal;

import React, { Dispatch } from 'react';
import Helmet from 'react-helmet';
import FooterMenu from '../common/component/footer-menu';
import { useDispatch } from 'react-redux';
import { Logout } from '../core/auth/state/actions';

const Settings = () => {
  const dispatchLogout = useDispatch<Dispatch<Logout>>();

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="container has-padding-bottom-75">
              <button className={`is-size-2 button is-large is-info is-fullwidth is-rounded`}>
                Update Profile
              </button>
            </div>
            <div className="container has-margin-top-50">
              <button
                className={`is-size-2 button is-large is-danger is-fullwidth is-rounded`}
                onClick={() => dispatchLogout(new Logout())}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <FooterMenu />
      </section>
    </>
  );
};

export default Settings;

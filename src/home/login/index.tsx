import React from 'react';
import Helmet from 'react-helmet';
import Sky from 'react-sky';
import chip from './images/chip.png';
import logo from './images/logo.png';
import styles from './styles.module.scss';
import LoginFacebook from './external-auth/Facebook';
import LoginGoogle from './external-auth/Google';

const gradient = 'linear-gradient(to top, #c31432, #240b36)';

const LoginComponent = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <figure className={`image ${styles.logo} container`}>
            <img src={logo} alt="vabanque-logo" />
          </figure>
        </div>
      </section>
      <section className="hero has-margin-top-20">
        <div className="hero-body">
          <div className="columns">
            <div className="container has-text-centered column">
              <LoginFacebook />
            </div>
            <div className="container has-text-centered column has-margin-top-15">
              <LoginGoogle />
            </div>
          </div>
        </div>
      </section>
      <Sky
        images={{
          0: chip,
        }}
        how={15}
        time={40}
        size="100px"
        background={`${gradient}`}
      />
    </>
  );
};

export default LoginComponent;
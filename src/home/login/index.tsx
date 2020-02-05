import React from 'react';
import Helmet from 'react-helmet';
import logo from './images/logo.png';
import styles from './styles.module.scss';
import LoginForm from './form';

const LoginComponent = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={styles.background}>
        <section className="section">
          <div className="container">
            <figure className={`image ${styles.logo} container`}>
              <img src={logo} alt="vabanque-logo" />
            </figure>
          </div>
        </section>
        <section className="hero">
          <div className="has-padding-10 has-margin-5">
            <div className="columns">
              <div className="container has-text-centered column">
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginComponent;

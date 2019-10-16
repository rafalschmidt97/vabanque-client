import React from 'react';
import styles from '../../styles.module.scss';

const LoginFacebook = () => {
  return (
    <button className={`${styles.start} button is-rounded is-large is-facebook is-full-width`}>
      <span className="icon">
        <i className="fab fa-facebook-f is-white"></i>
      </span>
      <span>Sign in with Facebook</span>
      <span className="icon">
        <i className="fas fa-chevron-right"></i>
      </span>
    </button>
  );
};

export default LoginFacebook;

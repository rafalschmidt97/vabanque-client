import React from 'react';
import styles from '../../styles.module.scss';

const LoginGoogle = () => {
  return (
    <button className={`${styles.start} button is-rounded is-large is-google is-full-width `}>
      <div className="columns is-mobile">
        <div className="column">
          <span className="icon">
            <i className="fab fa-google is-white"></i>
          </span>
        </div>
        <div className="column">
          <span>Sign in with Google </span>
        </div>
        <div className="column">
          <span className="icon">
            <i className="fas fa-chevron-right "></i>
          </span>
        </div>
      </div>
    </button>
  );
};

export default LoginGoogle;

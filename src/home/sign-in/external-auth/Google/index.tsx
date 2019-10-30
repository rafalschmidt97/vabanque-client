import React from 'react';
import styles from '../../styles.module.scss';
import authApi from '../api';
import { Login } from '../../../../core/auth/actions';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import localStorageService from '../../../../core/auth/localStorageService';

const LoginGoogle = () => {
  const dispatchLogin = useDispatch<Dispatch<Login>>();

  const login = () => {
    authApi.signIn().then(token => localStorageService.setTokens(token));
  };

  return (
    <button
      className={`${styles.start} button is-rounded is-large is-google is-full-width `}
      onClick={() => {
        login();
        dispatchLogin(new Login());
      }}
    >
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

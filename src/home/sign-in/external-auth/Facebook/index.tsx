import React, { Dispatch } from 'react';
import styles from '../../styles.module.scss';
import authApi from '../api';
import { Login } from '../../../../core/auth/state/actions';
import { useDispatch } from 'react-redux';
import localStorageService from '../../../../core/auth/state/localStorageService';

const LoginFacebook = () => {
  const dispatchLogin = useDispatch<Dispatch<Login>>();

  const login = () => {
    authApi.signIn().then(token => localStorageService.setTokens(token));
  };

  return (
    <button
      className={`${styles.start} button is-rounded is-large is-facebook is-full-width`}
      onClick={() => {
        login();
        dispatchLogin(new Login());
      }}
    >
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

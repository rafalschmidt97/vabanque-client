import React, { Dispatch } from 'react';
import styles from '../../styles.module.scss';
import { Token } from '../types';
import authApi from '../api';
import useLocalStorage from 'react-use-localstorage';
import { Login } from '../../../../core/auth/actions';
import { useDispatch } from 'react-redux';

const LoginFacebook = () => {
  const dispatchLogin = useDispatch<Dispatch<Login>>();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setRefreshToken] = useLocalStorage('refreshToken', '');

  const setTokens = (token: Token) => {
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
  };

  const login = () => {
    authApi.signIn().then(token => setTokens(token));
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

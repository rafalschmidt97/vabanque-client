import React from 'react';
import styles from '../../styles.module.scss';
import { Token } from '../types';
import authApi from '../api';
import useLocalStorage from 'react-use-localstorage';

const LoginGoogle = () => {
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
      className={`${styles.start} button is-rounded is-large is-google is-full-width `}
      onClick={login}
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

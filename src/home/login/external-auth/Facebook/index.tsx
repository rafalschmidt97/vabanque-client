import React, { Dispatch } from 'react';
import styles from '../../styles.module.scss';
import authApi from '../../../../core/auth/api';
import { Login } from '../../../../core/auth/state/actions';
import { useDispatch } from 'react-redux';
import { NavigateGame } from '../../../../core/footer-menu/state/actions';

const LoginFacebook = () => {
  const dispatchLogin = useDispatch<Dispatch<Login>>();
  const dispatchNavigateGame = useDispatch<Dispatch<NavigateGame>>();

  const login = () => {
    authApi.signInFacebook().then(token => {
      dispatchLogin(new Login(token));
      dispatchNavigateGame(new NavigateGame());
    });
  };

  return (
    <button
      className={`${styles.start} button is-rounded is-large is-facebook is-full-width`}
      onClick={() => {
        login();
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

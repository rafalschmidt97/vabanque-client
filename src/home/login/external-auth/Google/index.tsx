import React from 'react';
import styles from '../../styles.module.scss';
import authApi from '../../../../core/auth/api';
import { Login } from '../../../../core/auth/state/actions';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { NavigateGame } from '../../../../core/footer-menu/state/actions';

const LoginGoogle = () => {
  const dispatchLogin = useDispatch<Dispatch<Login>>();
  const dispatchNavigateGame = useDispatch<Dispatch<NavigateGame>>();

  const login = () => {
    authApi.signInGoogle().then(token => {
      dispatchLogin(new Login(token));
      dispatchNavigateGame(new NavigateGame());
    });
  };

  return (
    <button
      className={`${styles.start} button is-rounded is-large is-google is-full-width `}
      onClick={() => {
        login();
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

import React, { Dispatch } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../core/state';
import {
  NavigateGame,
  NavigateSettings,
  NavigateMoney,
} from '../../core/footer-menu/state/actions';

const FooterMenu = () => {
  const isGameActive = useSelector((state: RootState) => state.footer.isGameActive);
  const isMoneyActive = useSelector((state: RootState) => state.footer.isMoneyActive);
  const isSettingsActive = useSelector((state: RootState) => state.footer.isSettingsActive);
  const dispatchNavigateGame = useDispatch<Dispatch<NavigateGame>>();
  const dispatchNavigateMoney = useDispatch<Dispatch<NavigateMoney>>();
  const dispatchNavigateSettings = useDispatch<Dispatch<NavigateSettings>>();

  const navigateToGame = () => {
    dispatchNavigateGame(new NavigateGame());
  };

  const navigateToMoney = () => {
    dispatchNavigateMoney(new NavigateMoney());
  };

  const navigateToSettings = () => {
    dispatchNavigateSettings(new NavigateSettings());
  };

  return (
    <>
      <div className={`${styles.bottom} buttons has-addons is-fullwidth is-centered`}>
        <div
          className={classNames(`${styles.third} button is-large`, {
            'has-text-danger': !isGameActive,
            'is-danger': isGameActive,
          })}
          onClick={() => {
            navigateToGame();
          }}
        >
          Game
        </div>
        <div
          className={classNames(`${styles.thirdish} button is-large`, {
            'has-text-success': !isMoneyActive,
            'is-success': isMoneyActive,
          })}
          onClick={() => {
            navigateToMoney();
          }}
        >
          Money
        </div>
        <div
          className={classNames(`${styles.third} button is-large`, {
            'has-text-info': !isSettingsActive,
            'is-info': isSettingsActive,
          })}
          onClick={() => {
            navigateToSettings();
          }}
        >
          Settings
        </div>
      </div>
    </>
  );
};

export default FooterMenu;

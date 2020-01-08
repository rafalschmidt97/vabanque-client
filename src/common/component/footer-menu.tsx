import React from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router';

const FooterMenu = () => {
  const history = useHistory();
  return (
    <>
      <div className={`${styles.bottom} buttons has-addons is-fullwidth is-centered`}>
        <div
          className={`${styles.third} button is-large has-text-danger`}
          onClick={() => {
            history.push('/game');
          }}
        >
          Game
        </div>
        <div
          className={`${styles.thirdish} button is-large has-text-success`}
          onClick={() => {
            history.push('/money');
          }}
        >
          Money
        </div>
        <div
          className={`${styles.third} button is-large has-text-info`}
          onClick={() => {
            history.push('/settings');
          }}
        >
          Settings
        </div>
      </div>
    </>
  );
};

export default FooterMenu;

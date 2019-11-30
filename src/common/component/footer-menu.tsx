import React from 'react';
import styles from './styles.module.scss';

const FooterMenu = () => {
  return (
    <>
      <div className={`${styles.bottom} buttons has-addons is-fullwidth  is-centered`}>
        <div className={`${styles.third} button is-large is-primary`}>Game</div>
        <div className={`${styles.thirdish} button is-large is-primary`}>Money</div>
        <div className={`${styles.third} button is-large is-primary`}>Settings</div>
      </div>
    </>
  );
};

export default FooterMenu;

import React from 'react';
import styles from '../styles.module.scss';

const RankWait = () => {
  return (
    <>
      <div className={`${styles.pageloader} ${styles.active}`}>
        <span className="title">Wait for admin to rank players</span>
      </div>
    </>
  );
};
export default RankWait;

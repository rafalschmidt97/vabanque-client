import React from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router';

const GoBack = () => {
  const history = useHistory();

  return (
    <>
      <button
        className={`button is-danger is-size-3 is-rounded ${styles.back}`}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        <span className="icon is-small">
          <i className="fas fa-arrow-circle-left is-size-2"></i>
        </span>
      </button>
    </>
  );
};

export default GoBack;

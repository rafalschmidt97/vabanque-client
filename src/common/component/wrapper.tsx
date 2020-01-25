import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

const wrapHOC = (WrappedComponent: FunctionComponent) => {
  class Wrapper extends React.PureComponent {
    render() {
      return (
        <div className={`${styles.wrapper}`}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  return Wrapper;
};

export default wrapHOC;

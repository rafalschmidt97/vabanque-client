import React from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';

type Props = {
  fieldName: string;
  isVisible: boolean;
  color: string;
};

const Error = (props: Props) => {
  return (
    <div
      className={classNames(props.color, {
        'is-invisible': !props.isVisible,
      })}
    >
      <span className="icon">
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      <ErrorMessage name={props.fieldName} />
    </div>
  );
};

export default Error;

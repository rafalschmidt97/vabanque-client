import React from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';

type Props = {
  fieldName: string;
  isVisible: boolean;
};

const Error = (props: Props) => {
  return (
    <div
      className={classNames('has-text-danger', {
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

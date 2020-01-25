import React from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';

type Props = {
  fieldName: string;
  isVisible: boolean;
  color: string;
};

const ErrorLabel = (props: Props) => {
  return (
    <div
      className={classNames(props.color, {
        'is-invisible': !props.isVisible,
      })}
    >
      <span className="icon">
        <i className="fas fa-exclamation-triangle" />
      </span>
      <ErrorMessage name={props.fieldName} />
    </div>
  );
};

export default ErrorLabel;

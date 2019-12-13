import React from 'react';
import { Field } from 'formik';
import ErrorMessage from '../../../../../common/component/error';
import classNames from 'classnames';

type Props = {
  hasErrors: boolean;
};

const Email = (props: Props) => {
  return (
    <>
      <div className="control">
        <span className="is-flex align-items-center">
          <i className="fas fa-user has-margin-right-10 has-text-white" />
          <label className="label is-large has-text-white">Email</label>
        </span>
      </div>
      <div className="field">
        <div className="control ">
          <Field
            type="email"
            name="email"
            className={classNames('input is-large', {
              'is-danger': props.hasErrors,
            })}
          />
          <ErrorMessage fieldName="email" isVisible={props.hasErrors} color="has-text-danger" />
        </div>
      </div>
    </>
  );
};

export default Email;

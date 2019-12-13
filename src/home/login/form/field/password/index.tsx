import React from 'react';
import { Field } from 'formik';
import ErrorMessage from '../../../../../common/component/error';
import classNames from 'classnames';

type Props = {
  hasErrors: boolean;
};

const Password = (props: Props) => {
  return (
    <>
      <div className="control">
        <span className="icon is-large fa-lg has-margin-left-50">
          <i className="fas fa-user has-margin-right-10 has-text-white" />
          <label className="label is-large has-text-white">Password</label>
        </span>
      </div>
      <div className="field">
        <div className="control ">
          <Field
            type="password"
            name="password"
            className={classNames('input is-large', {
              'is-danger': props.hasErrors,
            })}
          />
          <ErrorMessage fieldName="password" isVisible={props.hasErrors} color="has-text-danger" />
        </div>
      </div>
    </>
  );
};

export default Password;

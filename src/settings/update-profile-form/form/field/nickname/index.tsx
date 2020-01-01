import React from 'react';
import { Field } from 'formik';
import ErrorMessage from '../../../../../common/component/error';
import classNames from 'classnames';

type Props = {
  hasErrors: boolean;
};

const Nickname = (props: Props) => {
  return (
    <>
      <div className="control">
        <span className="icon is-large fa-lg has-margin-left-50">
          <i className="fas fa-user has-margin-right-10" />
          <label className="label is-large">Nickname</label>
        </span>
      </div>
      <div className="field">
        <div className="control ">
          <Field
            name="nickname"
            className={classNames('input is-large', {
              'is-danger': props.hasErrors,
            })}
          />
          <ErrorMessage fieldName="nickname" isVisible={props.hasErrors} color="has-text-danger" />
        </div>
      </div>
    </>
  );
};

export default Nickname;

import React from 'react';
import { Field } from 'formik';
import Error from '../../../../../common/component/error';
import classNames from 'classnames';

type Props = {
  hasErrors: boolean;
};

const NicknameField = (props: Props) => {
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
          <Error fieldName="nickname" isVisible={props.hasErrors} />
        </div>
      </div>
    </>
  );
};

export default NicknameField;

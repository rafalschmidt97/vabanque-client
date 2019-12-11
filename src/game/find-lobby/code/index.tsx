import { Field } from 'formik';
import React from 'react';
import classNames from 'classnames';
import ErrorMessage from '../../../common/component/error';

type Props = {
  hasErrors: boolean;
};

const Code = (props: Props) => {
  return (
    <>
      <div className="field">
        <div className="control">
          <Field
            name="code"
            className={classNames('input has-text-centered is-size-2', {
              'is-danger': props.hasErrors,
            })}
          />
          <ErrorMessage fieldName="code" isVisible={props.hasErrors} color="has-text-light" />
        </div>
      </div>
    </>
  );
};

export default Code;

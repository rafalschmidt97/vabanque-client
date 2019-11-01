import React from 'react';
import { Field } from 'formik';
import Error from '../../../../common/components/error';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  hasErrors: boolean;
};

const Phone = (props: Props) => {
  return (
    <>
      <div className="control ">
        <span className="icon is-large fa-lg has-margin-left-25">
          <i className="fas fa-phone-alt has-margin-right-10" />
          <label className="label is-large ">Phone</label>
        </span>
      </div>
      <div className="field has-addons">
        <p className="control">
          <button className={`button is-static is-medium ${styles.number}`}>+358</button>
        </p>
        <div className="control">
          <Field
            type="tel"
            name="phoneNumber"
            className={classNames('input is-large', {
              'is-danger': props.hasErrors,
            })}
          />
          <Error fieldName="phoneNumber" isVisible={props.hasErrors} />
        </div>
      </div>
    </>
  );
};

export default Phone;

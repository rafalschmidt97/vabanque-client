import React from 'react';
import { Field } from 'formik';
import Error from '../../../../common/components/error';
import classNames from 'classnames';

type Props = {
  hasErrors: boolean;
  setProfilePictureText: (nickname: string) => void;
  handleBlur<T = string>(
    fieldOrEvent: T,
  ): T extends string ? ((e: React.ChangeEvent<HTMLInputElement>) => void) : void;
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
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.handleBlur(e);
              props.setProfilePictureText(e.target.value);
            }}
          />
          <Error fieldName="nickname" isVisible={props.hasErrors} />
        </div>
      </div>
    </>
  );
};

export default NicknameField;

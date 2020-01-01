import React from 'react';
import classNames from 'classnames';

type Props = {
  isSubmitting: boolean;
  joinFailed: boolean;
};

const Join = (props: Props) => {
  return (
    <div className="field has-margin-top-100">
      <div className="control">
        <button
          type="submit"
          className={classNames('is-size-2 button is-success is-fullwidth is-rounded', {
            'is-success': !props.joinFailed,
            'is-danger': props.joinFailed,
          })}
          disabled={props.isSubmitting}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Join;

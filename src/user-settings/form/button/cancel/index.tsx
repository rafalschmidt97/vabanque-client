import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../../core/auth/state/actions';

type Props = {
  isSubmitting: boolean;
};

const Cancel = (props: Props) => {
  const dispatchLogout = useDispatch<Dispatch<Logout>>();

  return (
    <div className="control">
      <button
        type="submit"
        className="button is-text is-large"
        disabled={props.isSubmitting}
        onClick={() => {
          dispatchLogout(new Logout());
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Cancel;

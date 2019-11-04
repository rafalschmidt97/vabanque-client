import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../../core/auth/state/actions';
import { useHistory } from 'react-router';

type Props = {
  isSubmitting: boolean;
};

const Cancel = (props: Props) => {
  const dispatchLogout = useDispatch<Dispatch<Logout>>();
  const history = useHistory();

  return (
    <div className="control">
      <button
        className="button is-text is-large"
        disabled={props.isSubmitting}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          dispatchLogout(new Logout());
          history.goBack();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Cancel;

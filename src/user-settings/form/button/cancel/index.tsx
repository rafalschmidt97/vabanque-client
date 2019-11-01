import React, { Dispatch } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../../core/auth/state/actions';

type Props = {
  isSubmitting: boolean;
};

const Cancel = (props: Props) => {
  const dispatchLogout = useDispatch<Dispatch<Logout>>();
  const history = useHistory();

  const cancel = () => {
    history.push('/');
  };

  return (
    <div className="control">
      <button
        type="submit"
        className="button is-text is-large"
        disabled={props.isSubmitting}
        onClick={() => {
          cancel();
          dispatchLogout(new Logout());
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Cancel;

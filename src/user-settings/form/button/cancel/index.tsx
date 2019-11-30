import React from 'react';
import { useHistory } from 'react-router';

type Props = {
  isSubmitting: boolean;
};

const Cancel = (props: Props) => {
  const history = useHistory();

  return (
    <div className="control">
      <button
        className="button is-text is-large"
        disabled={props.isSubmitting}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Cancel;

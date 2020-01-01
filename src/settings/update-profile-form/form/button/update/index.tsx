import React from 'react';

type Props = {
  isSubmitting: boolean;
};

const Update = (props: Props) => {
  return (
    <div className="control">
      <button type="submit" className="button is-primary is-large" disabled={props.isSubmitting}>
        Update
      </button>
    </div>
  );
};

export default Update;

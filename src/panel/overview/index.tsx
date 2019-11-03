import React, { useState, useReducer } from 'react';
import { IncrementCounter } from '../../core/overview/state/actions';
import { OverviewReducer } from '../../core/overview/state/reducer';

type Props = {
  initalCounter?: number;
};

const Overview = ({ initalCounter = 0 }: Props) => {
  const [localCounter, setLocalCounter] = useState(initalCounter);
  const [state, dispatch] = useReducer(OverviewReducer, { counter: initalCounter });

  return (
    <>
      <div>
        <p>Local counter: {localCounter}</p>
        <button onClick={() => setLocalCounter(localCounter + 1)}>+</button>
        <button onClick={() => setLocalCounter(localCounter - 1)}>-</button>
      </div>
      <div>
        <p>Redux count: {state.counter}</p>
        <button onClick={() => dispatch(new IncrementCounter())}>+</button>
      </div>
    </>
  );
};

export default Overview;

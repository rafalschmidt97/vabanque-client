import React, { FunctionComponent, useState, useReducer } from 'react';
import { IncrementCounter } from './actions';
import { OverviewReducer } from './reducer';

const Overview: FunctionComponent<{ initialCounter?: number }> = ({
  initialCounter: initial = 0,
}) => {
  const [localCounter, setLocalCounter] = useState(initial);
  const [state, dispatch] = useReducer(OverviewReducer, { counter: initial });

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
